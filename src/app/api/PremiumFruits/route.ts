import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

const PremiumItemSchema = z.object({
    name: z.string().min(1, "Name is required"),
    category: z.enum(["Imported_Plum",
        "DragonFruit",
        "Apple",
        "LonganImported",
        "GreenKiwi",
        "ApplePinkLady"]),
    importantPlum: z.enum(["Pcs_2",
        "Pcs_4",
        "Pcs_6",
        "Pcs_8",
        "Pcs_10"]).optional().nullable(),
    DragonFruit: z.enum(["Gram_200", "Gram_400", "Gram_500", "Gram_700", "Gram_800", "Gram_1000",]).optional().nullable(),
    Apple: z.enum(["Gram_500",
        "Gram_1000",
        "Gram_1500",
        "Gram_2000",
        "Gram_2500",
        "Gram_3000"]).optional().nullable(),
    ImportedLongan: z.enum(["GRAM_150", "GRAM_250", "GRAM_400", "GRAM_450", "GRAM_800", "GRAM_1000", "GRAM_1500"]).optional().nullable(),
    GreenKiwi: z.enum(["Pcs_2",
        "Pcs_4",
        "Pcs_6",
        "Pcs_8",
        "Pcs_10"]).optional().nullable(),
    ApplePinkLady: z.enum(["Gram_500",
        "Gram_1000",
        "Gram_1500",
        "Gram_2000",
        "Gram_2500",
        "Gram_3000"]).optional().nullable(),
    price: z.string().transform(val => parseFloat(val)),
    description: z.string().min(1, "Description is required"),
});

export async function POST(req: NextRequest) {
    try {

        const formData = await req.formData();


        const name = formData.get('name') as string;
        const category = formData.get('category') as any;
        const importantPlum = formData.get('importantPlum') as any;
        const DragonFruit = formData.get('DragonFruit') as any;
        const Apple = formData.get('Apple') as any;
        const ImportedLongan = formData.get('ImportedLongan') as any;
        const GreenKiwi = formData.get('GreenKiwi') as any;
        const ApplePinkLady = formData.get('ApplePinkLady') as any;
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


        const validatedData = PremiumItemSchema.parse({
            name,
            category,
            importantPlum,
            DragonFruit,
            Apple,
            ImportedLongan,
            GreenKiwi,
            ApplePinkLady,
            price,
            description
        });


       const uploadDir = path.join(process.cwd(), "public/assets/PremiumFruits")
       
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
             images.push(`/assets/PremiumFruits/${fileName}`);
           }


        const newPremiumItem = await prisma.premiumFruits.create({
            data: {
                ...validatedData,
                image: images,
            },
        });

        return NextResponse.json(
            { message: "Premium item created successfully", item: newPremiumItem },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ message: "Validation Error", errors: error.errors }, { status: 400 });
        }

        console.error("Error creating Premium item:", error);
        return NextResponse.json(
            { message: "Internal Server Error", error: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}


export async function GET(req: NextRequest) {
    try {

        const getPremiumData = await prisma.premiumFruits.findMany({});
        return NextResponse.json(
            {
                message: "Premium fruits items retrieved successfully",
                items: getPremiumData,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error retrieving Premium fruits items:", error);
        return NextResponse.json(
            {
                message: "Internal Server Error",
                error: error instanceof Error ? error.message : "Unknown error"
            },
            { status: 500 }
        );
    }
}

