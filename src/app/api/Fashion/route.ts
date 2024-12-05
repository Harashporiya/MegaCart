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
  category: z.enum(["WomensClothing", "MensClothing", "KidsClothing", "Accessories", "Footwear", "BagsAndLuggage"]),
  accessorySize: z.enum(["OneSize", "Small", "Medium", "Large"]).optional().nullable(),
  footwearSize: z.enum(["US_6", "US_7", "US_8", "US_9", "US_10", "US_11", "US_12"]).optional().nullable(),
  bagSize: z.enum(["Small", "Medium", "Large", "XLarge", "Compact", "Weekend", "Carry_On"]).optional().nullable(),
  size: z.enum(["S", "M", "L", "SM", "XL", "XXL", "XXXL"]).optional().nullable(),
  price: z.string().transform(val => parseFloat(val)),
  description: z.string().min(1, "Description is required"),
});

export async function POST(req: NextRequest) {
  try {
   
    const formData = await req.formData();
    
  
    const name = formData.get('name') as string;
    const brand = formData.get('brand') as string;
    const category = formData.get('category') as any;
    const accessorySize = formData.get('accessorySize') as any;
    const footwearSize = formData.get('footwearSize') as any;
    const bagSize = formData.get('bagSize') as any;
    const size = formData.get('size') as any;
    const price = formData.get('price') as string;
    const description = formData.get('description') as string;

  
    const imageFile = formData.get('image') as File;
    if (!imageFile) {
      return NextResponse.json({ message: "Image is required" }, { status: 400 });
    }

   
    const validatedData = FashionItemSchema.parse({
      name,
      brand,
      category,
      accessorySize,
      footwearSize,
      bagSize,
      size,
      price,
      description
    });

   
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

   
    const newFashionItem = await prisma.fashion.create({
      data: {
        ...validatedData,
        image: `/assets/${fileName}`,
      },
    });

    return NextResponse.json(
      { message: "Fashion item created successfully", item: newFashionItem },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Validation Error", errors: error.errors }, { status: 400 });
    }

    console.error("Error creating fashion item:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}