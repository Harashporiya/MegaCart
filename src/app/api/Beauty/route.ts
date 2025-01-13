import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { PrismaClient, CategoryBeauty } from "@prisma/client";
import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

const BeautyItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  brand: z.string().min(1, "Brand is required"),
  category: z.nativeEnum(CategoryBeauty),
  itemVolume: z.string().optional().nullable(),
  itemForm: z.string().optional().nullable(),
  price: z.string().transform(val => parseFloat(val)),
  description: z.string().min(1, "Description is required"),
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    const name = formData.get('name') as string;
    const brand = formData.get('brand') as string;
    const category = formData.get('category') as CategoryBeauty;
    const itemVolume = formData.get('itemVolume') as string | null;
    const itemForm = formData.get('itemForm') as string | null;
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

    const validatedData = BeautyItemSchema.parse({
      name,
      brand,
      category,
      itemVolume,
      itemForm,
      price,
      description
    });

   // Yeh line ek folder ka path banata hai.
   // process.cwd(): Current working directory ka path leta hai.
  // path.join: Isko "public/assets" folder ke saath combine karta hai.
    const uploadDir = path.join(process.cwd(), "public/assets");
    // fs.existsSync: Yeh check karta hai ki folder exist karta hai ya nahi.
   // Agar folder nahi hai:
   //  fs.mkdirSync: Yeh folder banata hai.
    //  recursive: true: Agar parent folders missing hain, toh unko bhi create karega.
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    
    for (const imageFile of imageFiles) {  // Yeh loop har file ko imageFiles array se uthata hai.
      const file = imageFile as File; // imageFile ko explicitly File object ke roop mein treat karta hai.
      const bytes = await file.arrayBuffer(); // File ka data read karta hai aur ArrayBuffer ke form mein data return karta hai.
      const buffer = Buffer.from(bytes); // ArrayBuffer ko Node.js ke binary Buffer format mein convert karta hai.

      const fileExtension = file.name.split('.').pop()?.toLowerCase() || 'jpg'; // File name se extension nikalta hai (e.g., .jpg ya .png)..pop(): Last part (extension) ko retrieve karta hai.|| 'jpg': Agar extension nahi mila toh default 'jpg' le leta hai.
      const fileName = `${uuidv4()}.${fileExtension}`; //uuidv4(): Unique ID generate karta hai, taaki file ka naam unique ho.
      const filePath = path.join(uploadDir, fileName); // Unique file name ko upload directory ke path ke saath combine karta hai.

      await writeFile(filePath, buffer); // File ke binary data ko disk par likhta hai. File ko disk par save karta hai public/assets folder mein.
      images.push(`/assets/${fileName}`); // File ka relative path /assets/{fileName} ko images array mein add karta hai.
    }

    const newBeautyItem = await prisma.beauty.create({
      data: {
        name: validatedData.name,
        Brand: validatedData.brand, 
        category: validatedData.category,
        itemVolume: validatedData.itemVolume,
        itemForm: validatedData.itemForm,
        price: validatedData.price,
        description: validatedData.description,
        image: images,
      },
    });

    return NextResponse.json(
      { message: "Beauty item created successfully", item: newBeautyItem },
      { status: 201 }
    );

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation Error", errors: error.errors },
        { status: 400 }
      );
    }

    console.error("Error creating beauty item:", error);
    return NextResponse.json(
      { 
        message: "Internal Server Error", 
        error: error instanceof Error ? error.message : "Unknown error" 
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const beautyItems = await prisma.beauty.findMany({});
    return NextResponse.json(
      {
        message: "Beauty items retrieved successfully",
        items: beautyItems,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving beauty items:", error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}