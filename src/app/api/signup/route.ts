import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import zod from 'zod';

const client = new PrismaClient();

const secretKey = "uquqhsjdduddbdhihddkdndjedbfh";

export async function POST(req: NextRequest,res:NextResponse) {
        const { name, email, password } = await req.json();

        try {
           
            const existingUser = await client.user.findUnique({
                where: { email }
            });

            if (existingUser) {
                return NextResponse.json({ error: "Email already exists" }, { status: 400 });
            }

            const hashPassword = await bcrypt.hash(password, 10);
            const userCreate = await client.user.create({
                data: {
                    name,
                    email,
                    password: hashPassword
                }
            });

            const token = jwt.sign(
                { id: userCreate.id, email: userCreate.email },
                secretKey,
                { expiresIn: "1d" }
            );

            return NextResponse.json({
                message: "Account created successfully",
                userCreate,
                token
            }, { status: 201 });

        } catch (error) {
            return NextResponse.json({ error: "Failed to create account" }, { status: 400 });
        }
}
