import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

const HomeKitchenItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.enum([
    "COOKWARE",
    "KITCHEN_APPLIANCES",
    "DINING_AND_SERVEWARE",
    "HOME_DECOR",
    "CLEANING_SUPPLIES"]),
  capacity: z.string().transform(val => parseFloat(val)).optional().nullable(),
  // volumeUnit:z.enum([ "LITER",
  //   "MILLILITER",
  //   "GALLON",
  //   "OUNCE",
  //   "CUP" ]).optional().nullable(),
  color: z.string().optional().nullable(),
  warranty: z.string().transform(val => parseFloat(val)).optional().nullable(),
  price: z.string().transform(val => parseFloat(val)),
  description: z.string().min(1, "Description is required"),
});

export async function POST(req: NextRequest) {
  try {

    const formData = await req.formData();


    const name = formData.get('name') as string;
    const category = formData.get('category') as any;
    // const volumeUnit = formData.get('volumeUnit') as any;
    const capacity = formData.get('capacity') as any;
    const color = formData.get('color') as string;
    const warranty = formData.get('warranty') as string;
    const price = formData.get('price') as string;
    const description = formData.get('description') as string;


    const images: string[] = [];

    const imageFiles = formData.getAll('images');

    if (!imageFiles || imageFiles.length === 0) {
      return NextResponse.json(
        { message: "At least one image is required" },
        { status: 400 }
      );
    }


    const validatedData = HomeKitchenItemSchema.parse({
      name,
      category,
      //  volumeUnit,
      capacity,
      color,
      warranty,
      price,
      description
    });


    const uploadDir = path.join(process.cwd(), "public/assets/HomeKitchen")

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
      images.push(`/assets/HomeKitchen/${fileName}`);
    }


    const newHomeKitchenItem = await prisma.homeKitchen.create({
      data: {
        ...validatedData,
        image: images,
      },
    });

    return NextResponse.json(
      { message: "Home Kitchen item created successfully", item: newHomeKitchenItem },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Validation Error", errors: error.errors }, { status: 400 });
    }

    console.error("Error creating home kitchen item:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}


export async function GET(req: NextRequest) {
  try {

    const getHomeKitchenData = await prisma.homeKitchen.findMany({});
    return NextResponse.json(
      {
        message: "Home Kitchen items retrieved successfully",
        items: getHomeKitchenData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving hoem kitchen items:", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

