import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

const GroceriesItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.enum(["Fresh_vegetables", "Fresh_fruits", "Canned_foods", "Sauces", "Oils_and_Vinegars"]),
  weight: z.enum(["Gram_500", "Gram_1000", "Gram_1500", "Gram_2000", "Gram_2500", "Gram_3000"]).optional().nullable(),
  SaucesWeight: z.enum(["Gram_250", "Gram_450", "Gram_500", "Gram_1000", "Gram_1500", "Gram_2000",]).optional().nullable(),
  OilsAndVinegarsWeight: z.enum(["Ml_250", "Ml_500", "Ml_1000", "Ml_1500", "Ml_2000"]).optional().nullable(),
  CannedFoodsWeight: z.enum(["GRAM_150", "GRAM_250", "GRAM_400", "GRAM_450", "GRAM_800", "GRAM_1000", "GRAM_1500"]).optional().nullable(),
  price: z.string().transform(val => parseFloat(val)),
  description: z.string().min(1, "Description is required"),
});

export async function POST(req: NextRequest) {
  try {

    const formData = await req.formData();


    const name = formData.get('name') as string;
    const category = formData.get('category') as any;
    const weight = formData.get('weight') as any;
    const SaucesWeight = formData.get('SaucesWeight') as any;
    const OilsAndVinegarsWeight = formData.get('OilsAndVinegarsWeight') as any;
    const CannedFoodsWeight = formData.get('CannedFoodsWeight') as any;
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


    const validatedData = GroceriesItemSchema.parse({
      name,
      category,
      weight,
      SaucesWeight,
      OilsAndVinegarsWeight,
      CannedFoodsWeight,
      price,
      description
    });


    const uploadDir = path.join(process.cwd(), "public/assets/Groceries")

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
      images.push(`/assets/Groceries/${fileName}`);
    }



    const newGroceriesItem = await prisma.groceries.create({
      data: {
        ...validatedData,
        image: images,
      },
    });

    return NextResponse.json(
      { message: "Groceries item created successfully", item: newGroceriesItem },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Validation Error", errors: error.errors }, { status: 400 });
    }

    console.error("Error creating Groceries item:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}


export async function GET(req: NextRequest) {
  try {

    const getGroceriesData = await prisma.groceries.findMany({});
    return NextResponse.json(
      {
        message: "Groceries items retrieved successfully",
        items: getGroceriesData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving groceries items:", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

