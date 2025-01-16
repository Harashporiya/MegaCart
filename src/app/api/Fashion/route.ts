import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Prisma, PrismaClient } from "@prisma/client";
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

    const images: string[] = [];
    const imageFiles = formData.getAll('images');

    if (!imageFiles || imageFiles.length === 0) {
      return NextResponse.json(
        { message: "At least one image is required" }, 
        { status: 400 }
      );
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

   
  //   const bytes = await imageFile.arrayBuffer(); //Image file ka data byte array ke form mein read karta hai. await ensure karta hai ki pura data read hone ke baad agla step chale.
  //   const buffer = Buffer.from(bytes); // Byte array ko Node.js ke binary Buffer format mein convert karta hai.
  //  // Buffer format file ko write karne ke liye perfect hota hai.
   
  //   const fileExtension = imageFile.name.split('.').pop(); // File ke naam ko . ke basis par split karta hai (e.g., "photo.jpg" -> ["photo", "jpg"]). // Last part nikalta hai, jo extension hota hai (e.g., jpg, png).
  //   const fileName = `${uuidv4()}.${fileExtension}`; // Ek unique ID generate karta hai. Unique ID ko extension ke saath combine karke ek unique file name banata hai (e.g., abcd1234.jpg).
  //   const filePath = path.join(process.cwd(), "public/assets", fileName); // Current working directory (process.cwd()) ko "public/assets" aur fileName ke saath combine karta hai.
  //   // File path banata hai jaha file save hogi (e.g., "public/assets/abcd1234.jpg").
    
  //   const dirPath = path.dirname(filePath); // File path ka directory portion nikalta hai (e.g., public/assets).
  //   if (!fs.existsSync(dirPath)) { // Check karta hai ki directory exist karti hai ya nahi.
  //     fs.mkdirSync(dirPath, { recursive: true }); // Agar directory exist nahi karti, to recursive mode mein usko create karta hai. Recursive mode se missing parent directories bhi ban jaati hain.
  //   }

  
  //   await writeFile(filePath, buffer); // buffer data ko specified filePath par save karta hai.
  //   // await ensures ki file write hone ke baad agla step chale.

  const uploadDir = path.join(process.cwd(),"public/assets/Fashion")

  if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir,{recursive:true})
  }

  for(const imageFile of imageFiles){
    const file = imageFile as File;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileExtension = file.name.split('.').pop()?.toLowerCase() || 'jpg'; 
    const fileName = `${uuidv4()}.${fileExtension}`;
    const filePath = path.join(uploadDir, fileName);

    await writeFile(filePath, buffer); 
    images.push(`/assets/Fashion/${fileName}`);
  }
   
    const newFashionItem = await prisma.fashion.create({
      data: {
        ...validatedData,
        image:images,
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


export async function GET(req: NextRequest) {
  try {
    
    const getFashionData = await prisma.fashion.findMany({});
    return NextResponse.json(
      { 
        message: "Fashion items retrieved successfully", 
        items: getFashionData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving fashion items:", error);
    return NextResponse.json(
      { 
        message: "Internal Server Error", 
        error: error instanceof Error ? error.message : "Unknown error" 
      },
      { status: 500 }
    );
  }
}

