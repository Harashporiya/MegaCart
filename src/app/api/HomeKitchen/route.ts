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
  capacity:z.string().transform(val=>parseFloat(val)).optional().nullable(),
  // volumeUnit:z.enum([ "LITER",
  //   "MILLILITER",
  //   "GALLON",
  //   "OUNCE",
  //   "CUP" ]).optional().nullable(),
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
    const price = formData.get('price') as string;
    const description = formData.get('description') as string;

  
    const imageFile = formData.get('image') as File;
    if (!imageFile) {
      return NextResponse.json({ message: "Image is required" }, { status: 400 });
    }

   
    const validatedData = HomeKitchenItemSchema.parse({
      name,
      category,
    //  volumeUnit,
      capacity,
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

   
    const newHomeKitchenItem = await prisma.homeKitchen.create({
      data: {
        ...validatedData,
        image: `/assets/${fileName}`,
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

