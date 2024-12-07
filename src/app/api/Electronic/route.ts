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
  ramSize: z.number().optional().nullable(),
  storageType: z.enum(["SSD", "HDD", "EMMC", "NVMe"]).optional().nullable(),
  storageCapacity: z.number().optional().nullable(),
  displaySize: z.number().optional().nullable(),
  batteryCapacity: z.number().optional().nullable(),
  warranty: z.number().optional().nullable(),
  color: z.string().optional().nullable(),
  weight: z.number().optional().nullable(),
  price: z.string().transform(val => parseFloat(val)),
  description: z.string().min(1, "Description is required"),
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const imageFile = formData.get('image') as File;
    if (!imageFile) {
      return NextResponse.json({ message: "Image is required" }, { status: 400 });
    }

    // Convert form data to an object that matches the schema
    const dataToValidate = {
      name: formData.get('name') as string,
      brand: formData.get('brand') as string,
      model: formData.get('model') as string | undefined,
      category: formData.get('category') as any,
      stockQuantity: parseInt(formData.get('stockQuantity') as string),
      isAvailable: formData.get('isAvailable') === 'true',
      processorType: formData.get('processorType') as string | undefined,
      ramSize: formData.get('ramSize'),
      storageType: formData.get('storageType') as any,
      storageCapacity: formData.get('storageCapacity') ,
      displaySize: formData.get('displaySize') ,
      batteryCapacity: formData.get('batteryCapacity'),
      warranty: formData.get('warranty'),
      color: formData.get('color') as string | undefined,
      weight: formData.get('weight'),
      price: formData.get('price') as string,
      description: formData.get('description') as string,
    };

    
    const validatedData = FashionItemSchema.parse(dataToValidate);

   
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileExtension = imageFile.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const filePath = path.join(process.cwd(), "public/assets", fileName);

   
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

 
    await writeFile(filePath, buffer);

   
    const newElectronicItem = await prisma.electronic.create({
      data: {
        ...validatedData,
        image: [`/assets/${fileName}`], 
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