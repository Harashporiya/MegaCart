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
          url: "#",
        },
        {
          title: "Fresh fruits",
          url: "#",
        },
        {
            title: "Canned foods",
            url: "#",
          },
          {
            title: "Sauces",
            url: "#",
          },
          {
            title: "Oils & Vinegars",
            url: "#",
          },
      ],
    },
    {
      title: "Premium Fruits",
      url: "#",
      items: [
        {
          title: "Imported Plum",
          url: "#",
        },
        {
          title:"Dragon fruit",
          url: "#",
          isActive: true,
        },
        {
          title: "Apple",
          url: "#",
        },
        {
          title: "Longan - imported",
          url: "#",
        },
        {
          title: "Green Kiwi",
          url: "#",
        },
        {
          title: "Apple - Pink Lady",
          url: "#",
        },
      ],
    },
    {
      title: "Home & Kitchen",
      url: "#",
      items: [
        {
          title: "Cookware",
          url: "#",
        },
        {
          title: "Kitchen Appliances",
          url: "#",
        },
        {
          title: "Dining & Serveware",
          url: "#",
        },
        {
          title: "Home Decor",
          url: "#",
        },
        {
          title: "Cleaning Supplies",
          url: "#",
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
            url: "#",
          },
          {
            title: "Tablets",
            url: "#",
          },
          {
            title: "Headphones",
            url: "#",
          },
          {
            title: "Smart Watches",
            url: "#",
          },
          {
            title: "Speakers",
            url: "/admin/Electronic/Speakers",
          },
          {
            title: "Printers",
            url: "#",
          },
          {
            title: "GameConsoles",
            url: "#",
          },
      ],
    },
    {
        title: "Beauty",
        url: "#",
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
