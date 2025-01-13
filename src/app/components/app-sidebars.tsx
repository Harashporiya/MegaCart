"use client"
import * as React from "react"
import { GalleryVerticalEnd } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"


const data = {
  navMain: [
    {
      title: "Groceries",
      url: "#",
      items: [
        {
          title: "Fresh vegetables",
          url: "/admin/Groceries/FreshVegetables",
        },
        {
          title: "Fresh fruits",
          url: "/admin/Groceries/FreshFruites",
        },
        {
            title: "Canned foods",
            url: "/admin/Groceries/CannedFoods",
          },
          {
            title: "Sauces",
            url: "/admin/Groceries/Sauces",
          },
          {
            title: "Oils & Vinegars",
            url: "/admin/Groceries/OilsAndVinegars",
          },
      ],
    },
    {
      title: "Premium Fruits",
      url: "#",
      items: [
        {
          title: "Imported Plum",
          url: "/admin/PremiumFruits/ImprotedPlum",
        },
        {
          title:"Dragon fruit",
          url: "/admin/PremiumFruits/DragonFruits",
          isActive: true,
        },
        {
          title: "Apple",
          url: "/admin/PremiumFruits/Apple",
        },
        {
          title: "Longan - imported",
          url: "/admin/PremiumFruits/ImprotedLongan",
        },
        {
          title: "Green Kiwi",
          url: "/admin/PremiumFruits/GreenKiwi",
        },
        {
          title: "Apple - Pink Lady",
          url: "/admin/PremiumFruits/ApplePinkLady",
        },
      ],
    },
    {
      title: "Home & Kitchen",
      url: "/admin/HomeKitchenForm",
      items: [
        {
          title: "Cookware",
          url: "/admin/HomeKitchen/Cookware",
        },
        {
          title: "Kitchen Appliances",
          url: "/admin/HomeKitchen/KitchenAppliances",
        },
        {
          title: "Dining & Serveware",
          url: "/admin/HomeKitchen/DiningServeware",
        },
        {
          title: "Home Decor",
          url: "/admin/HomeKitchen/HomeDeco",
        },
        {
          title: "Cleaning Supplies",
          url: "/admin/HomeKitchen/CleaningSupplies",
        },
      ],
    },
    {
      title: "Fashion Add",
      url: "/admin/Fashionform",
      items: [
        {
          title: "Women's Clothing",
          url: "/admin/Fashion/Women-clothing",
        },
        {
          title: "Men's Clothing",
          url: "/admin/Fashion/Men-clothing",
         
        },
        {
          title: "Kids' Clothing",
          url: "/admin/Fashion/Kids-clothing",
        },
        {
          title: "Accessories",
          url: "/admin/Fashion/Accessories",
        },
        {
          title: "Footwear",
          url: "/admin/Fashion/Footwear",
        },
        {
            title: "Bags & Luggage",
            url: "/admin/Fashion/Bags",
          },
      ],
    },
    {
      title: "Electronic Add",
      url: "/admin/Electronicform",
      items: [
        {
          title: "Smartphones ",
          url: "/admin/Electronic/SmartPhones",
        },
        {
            title: "Laptops",
            url: "/admin/Electronic/Laptops",
          },
          {
            title: "Tablets",
            url: "/admin/Electronic/Tablets",
          },
          {
            title: "Headphones",
            url: "/admin/Electronic/HeadPhones",
          },
          {
            title: "Smart Watches",
            url: "/admin/Electronic/SmartWatches",
          },
          {
            title: "Speakers",
            url: "/admin/Electronic/Speakers",
          },
          {
            title: "Printers",
            url: "/admin/Electronic/Printers",
          },
          {
            title: "Cameras",
            url: "/admin/Electronic/Cameras",
          },
          {
            title: "GameConsoles",
            url: "/admin/Electronic/GameConsoles",
          },
      ],
    },
    {
        title: "Beauty",
        url: "/admin/BeautyForm",
        items: [
          {
            title: "Skincare",
            url: "#",
          },
          {
            title: "Makeup",
            url: "#",
          },
          {
            title: "Hair Care",
            url: "#",
          },
          {
            title: "Fragrances",
            url: "#",
          },
          {
            title: "Personal Care",
            url: "#",
          },
          {
              title: "Bath & Body",
              url: "#",
            },
        ],
      },
      {
        title: "Home Improvement",
        url: "#",
        items: [
          {
            title: "Tools",
            url: "#",
          },
          {
            title: "Lighting",
            url: "#",
          },
          {
            title: "Hardware",
            url: "#",
          },
          {
            title: "Paint & Supplies",
            url: "#",
          },
          {
            title: "Bathroom Fixtures",
            url: "#",
          },
          {
              title: "Heating & Cooling",
              url: "#",
            },
        ],
      },
      {
        title: "Sports, Toys & Luggage",
        url: "#",
        items: [
          {
            title: "Outdoor Sports",
            url: "#",
          },
          {
            title: "Indoor Games",
            url: "#",
          },
          {
            title: "Fitness Equipment",
            url: "#",
          },
          {
            title: "Toys & Collectibles",
            url: "#",
          },
          {
            title: "Luggage",
            url: "#",
          },
          {
              title: "Travel Accessories",
              url: "#",
            },
        ],
      },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Documentation</span>
                  <span className="">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="font-medium">
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={item.isActive}>
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
