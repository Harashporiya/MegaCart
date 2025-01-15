"use client"
import { AppSidebar } from "@/app/components/app-sidebars"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import axios from "axios"
import { useEffect, useState } from "react"
import Image from "next/image"


interface bathBodyItem {
    id: string;
    name: string;
    category: string;
    price: number;
    image: string[];
    description: string;
    itemVolume: string;
    itemForm: string;
}

export default function BathBodyPage() {
    const [bathBodyItem, setbathBody] = useState<bathBodyItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedImages, setSelectedImages] = useState<{ [key: string]: number }>({});


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Beauty`);

                const bathBody = response.data.items.filter(
                    (item: bathBodyItem) => item.category === 'Bath_Body'
                );

                setbathBody(bathBody);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data", error);
                setError("Failed to fetch bath body items");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <div className="p-6 text-center">Loading...</div>
                </SidebarInset>
            </SidebarProvider>
        );
    }

    if (error) {
        return (
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <div className="p-6 text-red-500">{error}</div>
                </SidebarInset>
            </SidebarProvider>
        );
    }

    const handleClickeImageSet = (itemId: string, imageIndex: number) => {
        setSelectedImages((prev) => ({ ...prev, [itemId]: imageIndex }));
    };


    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b">
                    <div className="flex items-center gap-2 px-3">
                        <SidebarTrigger />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href="#">Bath Body</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Collection</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>

                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-6">Bath Body</h1>

                    {bathBodyItem.length === 0 ? (
                        <p className="text-gray-500">No bath body  items found.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {bathBodyItem.map((item) => (
                                <div
                                    key={item.id}
                                    className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                                >
                                    <div className="relative w-[400px] flex items-center ml-[70px] h-[330px]">
                                        <Image
                                            src={item.image[selectedImages[item.id] || 3]}
                                            alt={item.name}
                                            fill
                                            className="object-cover mt-1"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h2 className="text-xl font-semibold mb-2">{item.name}</h2>

                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-bold text-gray-900">&#8377; {item.price}</span>
                                            <span className="text-sm text-gray-500">Item Form: {item.itemForm}</span>

                                            <span className="text-sm text-gray-500">Item Volume: {item.itemVolume}</span>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-2 line-clamp-2">{item.description}</p>
                                    </div>
                                    <div className="grid gap-2 mt-4 overflow-x-auto  bg-gray-800 ">
                                        <div className="flex space-x-2">
                                            {item.image.map((img, index) => (
                                                <div key={index} className="relative gap-[10px] ml-4 p-10 w-48 h-24 flex-shrink-0 hover:border-[2px] hover:border-black">
                                                    <button
                                                        onClick={() => handleClickeImageSet(item.id, index)}>
                                                        <Image
                                                            src={img}
                                                            alt={`Thumbnail ${index + 1}`}
                                                            fill
                                                            className="object-cover rounded"
                                                        />
                                                    </button>

                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}