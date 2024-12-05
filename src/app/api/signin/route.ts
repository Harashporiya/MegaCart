import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

const client = new PrismaClient();
const secretKey = "uquqhsjdduddbdhihddkdndjedbfh";

export async function POST(req: NextRequest, res: NextResponse) {
    const { email, password } = await req.json();

    try {
        const user = await client.user.findUnique({
            where: { email }
        });


        if (!user) {
            return NextResponse.json({
                error: "User not found with this email"
            }, { status: 401 });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);


        if (!isValidPassword) {
            return NextResponse.json({
                error: "Incorrect password"
            }, { status: 401 });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            secretKey,
            { expiresIn: "1d" }
        );

        return NextResponse.json({
            message: "Login successful",
            token,
            user
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            error: "Authentication failed. Please try again."
        }, { status: 400 });
    }
}

export async function GET(req: NextRequest) {
    const token = req.headers.get("authorization")
    // console.log("Token server side",token)
    if (!token) {
        return NextResponse.json({
            error: "No token provided"
        }, { status: 401 });
    }

    try {

        const decoded = jwt.verify(token, secretKey);

        if (typeof decoded !== "string" && "id" in decoded) {
            const user = await client.user.findUnique({
                where: { id: decoded.id },
                select: {
                    id: true,
                    email: true,
                    name: true
                }
            });

            if (!user) {
                return NextResponse.json({
                    error: "User not found"
                }, { status: 401 });
            }

            return NextResponse.json(
                {
                    message: "Token is valid",
                    user
                },
                { status: 200 }
            );
        } else {
            throw new Error("Invalid token structure");
        }
    } catch (error) {
        return NextResponse.json({
            error: "Invalid or expired token"
        }, { status: 401 });
    }
}