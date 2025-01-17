import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

const HomeImprovementItemSchema = z.object({
    name: z.string().min(1, "Name is required"),
    brand: z.string().optional().nullable(),
    category: z.enum(["Tools",
        "Lighting",
        "PaintAndSupplies",
        "BathroomAndFixtures",
        "HeatingAndCooling"]),
    color: z.string().optional().nullable(),
    numberOfItem: z.string().optional().nullable(),
    material: z.string().optional().nullable(),
    headStyle: z.string().optional().nullable(),
    roomType: z.string().optional().nullable(),
    itemVolume: z.string().optional().nullable(),
    itemForm: z.string().optional().nullable(),
    size: z.string().optional().nullable(),
    finishType: z.string().optional().nullable(),
    capacity: z.string().optional().nullable(),
    coolingPower: z.string().optional().nullable(),
    product: z.string().optional().nullable(),
    price: z.string().transform(val => parseFloat(val)),
    description: z.string().min(1, "Description is required"),
});

export async function POST(req: NextRequest) {
    try {

        const formData = await req.formData();


        const name = formData.get('name') as string;
        const brand = formData.get('brand') as string;
        const category = formData.get('category') as any;
        const color = formData.get('color') as string;
        const numberOfItem = formData.get('numberOfItem') as string;
        const material = formData.get('material') as string;
        const headStyle = formData.get('headStyle') as string;
        const roomType = formData.get('roomType') as string;
        const itemVolume = formData.get('itemVolume') as string;
        const itemForm = formData.get('itemForm') as string;
        const size = formData.get('size') as string;
        const finishType = formData.get('finishType') as string;
        const capacity = formData.get('capacity') as string;
        const coolingPower = formData.get('coolingPower') as string;
        const product = formData.get('product') as string;
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


        const validatedData = HomeImprovementItemSchema.parse({
            name,
            brand,
            category,
            color,
            numberOfItem,
            material,
            headStyle,
            roomType,
            itemVolume,
            itemForm,
            size,
            finishType,
            capacity,
            coolingPower,
            product,
            price,
            description
        });


        const uploadDir = path.join(process.cwd(), "public/assets/HomeImprovement")

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
            images.push(`/assets/HomeImprovement/${fileName}`);
        }



        const newgetHomeImprovementDataItem = await prisma.homeImprovement.create({
            data: {
                ...validatedData,
                image: images,
            },
        });

        return NextResponse.json(
            { message: "Home Improvement item created successfully", item:  newgetHomeImprovementDataItem},
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ message: "Validation Error", errors: error.errors }, { status: 400 });
        }

        console.error("Error creating Home Improvement item:", error);
        return NextResponse.json(
            { message: "Internal Server Error", error: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}


export async function GET(req: NextRequest) {
    try {

        const getHomeImprovementData = await prisma.homeImprovement.findMany({});
        return NextResponse.json(
            {
                message: "Home Improvement items retrieved successfully",
                items: getHomeImprovementData,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error retrieving home improvement items:", error);
        return NextResponse.json(
            {
                message: "Internal Server Error",
                error: error instanceof Error ? error.message : "Unknown error"
            },
            { status: 500 }
        );
    }
}

