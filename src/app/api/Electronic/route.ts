import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

const FashionItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  brand: z.string().min(1, "Brand is required"),
  model: z.string().optional().nullable(),
  category: z.enum([
    "Smartphones",
    "Laptops",
    "Tablets",
    "Headphones",
    "SmartWatches",
    "Speakers",
    "Cameras",
    "Printers",
    "GameConsoles"
  ]),
  stockQuantity: z.number().int().min(0, "Stock quantity must be non-negative"),
  isAvailable: z.boolean(),
  processorType: z.string().optional().nullable(),
  ramSize: z.union([
    z.number(),
    z.string().transform((val) => parseInt(val, 10))
  ]).optional().nullable(),
  storageType: z.enum(["SSD", "HDD", "EMMC", "NVMe"]).optional().nullable(),
  storageCapacity: z.union([
    z.number(),
    z.string().transform((val) => parseInt(val, 10))
  ]).optional().nullable(),
  displaySize: z.number().optional().nullable(),
  batteryCapacity: z.union([
    z.number(),
    z.string().transform((val) => parseInt(val, 10))
  ]).optional().nullable(),
  warranty: z.union([
    z.number(),
    z.string().transform((val) => parseInt(val, 10))
  ]).optional().nullable(),
  color: z.string().optional().nullable(),
  weight: z.number().optional().nullable(),
  price: z.string().transform(val => parseFloat(val)),
  description: z.string().min(1, "Description is required"),
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const images: string[] = [];

    const imageFiles = formData.getAll('images');

    if (!imageFiles || imageFiles.length === 0) {
      return NextResponse.json(
        { message: "At least one image is required" },
        { status: 400 }
      );
    }


    const dataToValidate = {
      name: formData.get('name') as string,
      brand: formData.get('brand') as string,
      model: formData.get('model') as string | undefined,
      category: formData.get('category') as any,
      stockQuantity: parseInt(formData.get('stockQuantity') as string),
      isAvailable: formData.get('isAvailable') === 'true',
      processorType: formData.get('processorType') as string | undefined,
      ramSize: formData.get('ramSize') as any,
      storageType: formData.get('storageType') as any,
      storageCapacity: formData.get('storageCapacity'),
      displaySize: formData.get('displaySize'),
      batteryCapacity: formData.get('batteryCapacity'),
      warranty: formData.get('warranty'),
      color: formData.get('color') as string | undefined,
      weight: formData.get('weight'),
      price: formData.get('price') as string,
      description: formData.get('description') as string,
    };


    const validatedData = FashionItemSchema.parse(dataToValidate);


    const uploadDir = path.join(process.cwd(), "public/assets/Electronic")

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }

    for (const imageFile of imageFiles) {
      const file = imageFile as File;
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileExtension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
      const fileName = `${uuidv4()}.${fileExtension}`;
      const filePath = path.join(uploadDir, fileName);

      await writeFile(filePath, buffer);
      images.push(`/assets/Electronic/${fileName}`);
    }


    const newElectronicItem = await prisma.electronic.create({
      data: {
        ...validatedData,
        image: images,
      },
    });

    return NextResponse.json(
      { message: "Electronic item created successfully", item: newElectronicItem },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation Error", errors: error.errors },
        { status: 400 }
      );
    }

    console.error("Error creating electronic item:", error);
    return NextResponse.json(
      {
        message: "Internal Server Error"
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {

    const getElectronicData = await prisma.electronic.findMany({});
    return NextResponse.json(
      {
        message: "Electronic items retrieved successfully",
        items: getElectronicData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving electronic items:", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}