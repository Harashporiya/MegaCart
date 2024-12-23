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


interface FashionItem {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  image: string;
  accessorySize: string;
  description: string;
}

export default function AccessoriesPage() {
  const [fashionItems, setFashionItems] = useState<FashionItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/Fashion`);

        const accessories = response.data.items.filter(
          (item: FashionItem) => item.category === 'Accessories'
        );
        console.log(accessories)
        setFashionItems(accessories);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
        setError("Failed to fetch accessories items");
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
                  <BreadcrumbLink href="#">Accessories</BreadcrumbLink>
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
          <h1 className="text-2xl font-bold mb-6">Accessories</h1>

          {fashionItems.length === 0 ? (
            <p className="text-gray-500">No Accessories items found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {fashionItems.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative w-full h-64">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
                    <p className="text-gray-600 mb-2">{item.brand}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">₹{item.price}</span>
                      <span className="text-sm text-gray-500">Size: {item.accessorySize}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">{item.description}</p>
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