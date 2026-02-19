"use client";
import icon from "@/app/[locale]/icon.png";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import {
    ChevronDown,
    Gift,
    Headset,
    Heart,
    Mail,
    Phone,
    ShoppingBag,
    UserRoundKey,
    UserRoundPlus,
    Van,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import LanguageSwitcher from "../navbarComponents/languageSwitcher";
import SearchBar from "../navbarComponents/searchBar";
import ThemeToggle from "../navbarComponents/themeToggle";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const t = useTranslations("Navbar");
    const path = usePathname()
    return (
        <>
            <div className="top-nav bg-muted border-b border-border container mx-auto hidden lg:flex justify-between items-center chart-4 py-1.5 px-4">
                <div className="right flex items-center justify-between space-x-5">
                    <div className="shipping flex items-center space-x-1">
                        <Van className="text-primary" />
                        <p className="text-muted-foreground text-sm">{t("shipping")}</p>
                    </div>
                    <div className="new flex items-center space-x-1">
                        <Gift className="text-primary" />
                        <p className="text-muted-foreground text-sm">{t("newArrivals")}</p>
                    </div>
                </div>
                <div className="left flex items-center justify-between space-x-4">
                    <div className="phone-num flex items-center space-x-1">
                        <Phone className="text-primary w-5" />
                        <a
                            className="text-muted-foreground text-sm hover:text-[#6D28D9] transition-colors duration-200"
                            href={`tel:+1 (800) 123-4567`}
                        >
                            +1 (800) 123-4567
                        </a>
                    </div>
                    <div className="phone-num flex items-center space-x-1">
                        <Mail className="text-primary w-5" />
                        <a
                            className="text-muted-foreground text-sm hover:text-[#6D28D9] transition-colors duration-200"
                            href={`mailto:support@cartivo.com`}
                        >
                            support@cartivo.com
                        </a>
                    </div>
                    <div className="join-us flex items-center gap-4">
                        <Link
                            className="flex items-center space-x-1.5 text-muted-foreground text-sm hover:text-[#6D28D9] transition-colors duration-200"
                            href={"/login"}
                        >
                            <UserRoundKey className="w-5 text-primary me-1" /> {t("login")}
                        </Link>
                        <Link
                            className="flex items-center space-x-1.5 text-muted-foreground text-sm hover:text-[#6D28D9] transition-colors duration-200"
                            href={"/register"}
                        >
                            <UserRoundPlus className="w-5 text-primary me-1" />
                            {t("register")}
                        </Link>
                    </div>
                </div>
            </div>
            <header className="sticky top-0 z-50">
                <nav className="px-4 hidden lg:block bg-background border-b border-border py-2 backdrop-blur supports-[backdrop-filter]:bg-background/70">
                    <div className="bottom-nav container mx-auto hidden lg:flex justify-between items-center">
                        <div className="nav-logo">
                            <Link className="flex space-x-1.5 items-center" href={"/"}>
                                <Image src={icon} width={40} height={40} alt="Cartivo logo" />
                                <h1 className="font-bold text-2xl">Cartivo</h1>
                            </Link>
                        </div>
                        <div className="search">
                            <SearchBar />
                        </div>
                        <div className="nav-link"></div>
                        <div className="nav-link">
                            <NavigationMenu>
                                <NavigationMenuList className="list-none space-x-2.5">
                                    <NavigationMenuItem>
                                        <NavigationMenuLink asChild className="font-medium">
                                            <Link
                                                className={path == "/" ? "active hover:bg-primary hover:text-white transition-colors duration-200" : "hover:bg-primary hover:text-white transition-colors duration-200"}
                                                href="/"
                                            >
                                                {t("home")}
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem>
                                        <NavigationMenuLink asChild className="font-medium">
                                            <Link
                                                className={path == "/products" ? "active hover:bg-primary hover:text-white transition-colors duration-200" : "hover:bg-primary hover:text-white transition-colors duration-200"}
                                                href="/products"
                                            >
                                                {t("products")}
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem>
                                        <NavigationMenuLink asChild className="font-medium">
                                            <Link
                                                className={path == "/categories" ? "active hover:bg-primary hover:text-white transition-colors duration-200" : "hover:bg-primary hover:text-white transition-colors duration-200"}
                                                href="/categories"
                                            >
                                                {t("categories")}
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                    <NavigationMenuItem>
                                        <NavigationMenuLink asChild className="font-medium">
                                            <Link
                                                className={path == "/brands" ? "active hover:bg-primary hover:text-white transition-colors duration-200" : "hover:bg-primary hover:text-white transition-colors duration-200"}
                                                href="/brands"
                                            >
                                                {t("brands")}
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                </NavigationMenuList>
                                <NavigationMenuViewport />
                            </NavigationMenu>
                        </div>
                        <div className="flex items-center space-x-6">
                            <div className="support">
                                <Link
                                    className="flex items-center space-x-1 hover:text-primary transition-colors duration-200"
                                    href={"/contact"}
                                >
                                    <Headset />
                                    <div className="text ">
                                        <span className="text-muted-foreground text-xs">
                                            {t("help")}
                                        </span>
                                        <p className="font-bold text-sm">27/7</p>
                                    </div>
                                </Link>
                            </div>
                            <Link href={"/wishlist"}>
                                <Heart className="hover:text-red-600 transition-colors duration-200" />
                            </Link>
                            <Link href={"/cart"}>
                                <ShoppingBag className="hover:text-primary transition-colors duration-200" />
                            </Link>
                            <ThemeToggle />
                            <LanguageSwitcher />
                        </div>
                    </div>
                </nav>
            </header>
            <div className="mobile py-1.5 px-4 flex justify-between items-center lg:hidden">
                <div className="nav-logo flex space-x-1.5 items-center">
                    <Image src={icon} width={30} height={30} alt="Cartivo logo" />
                    <h1 className="font-bold text-2xl">Cartivo</h1>
                </div>
                <div className="flex items-center gap-3">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button>
                                <Menu className="w-6 h-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="px-2" side="right">
                            <SheetHeader className="flex-row items-end">
                                <Image src={icon} width={30} height={30} alt="Cartivo logo" />
                                <SheetTitle className="text-xl">Cartivo</SheetTitle>
                            </SheetHeader>
                            <div className="mt-2 flex flex-col gap-20">
                                <div className="links flex flex-col gap-4">
                                    <Link className="hover:bg-purple-300 hover:text-accent transition-colors duration-200 border border-white/20 p-2 rounded-md" href="/">{t("home")}</Link>
                                    <Link className="hover:bg-purple-300 hover:text-accent transition-colors duration-200 border border-white/20 p-2 rounded-md" href="/products">{t("products")}</Link>
                                    <Link className="hover:bg-purple-300 hover:text-accent transition-colors duration-200 border border-white/20 p-2 rounded-md" href="/categories">{t("categories")}</Link>
                                    <Link className="hover:bg-purple-300 hover:text-accent transition-colors duration-200 border border-white/20 p-2 rounded-md" href="/brands">{t("brands")}</Link>
                                </div>
                                <SearchBar />
                                <div className="helpers flex items-center space-x-4 lg:space-x-6 ">
                                    <Link
                                        className="flex items-center space-x-1 hover:text-primary transition-colors duration-200"
                                        href="/contact"
                                    >
                                        <Headset />
                                        <div className="text ">
                                            <span className="text-muted-foreground text-xs">
                                                {t("help")}
                                            </span>
                                            <p className="font-bold text-sm">27/7</p>
                                        </div>
                                    </Link>
                                    <Link href={"/wishlist"}>
                                        <Heart className="hover:text-red-600 transition-colors duration-200" />
                                    </Link>
                                    <Link href={"/cart"}>
                                        <ShoppingBag className="hover:text-primary transition-colors duration-200" />
                                    </Link>
                                    <ThemeToggle />
                                    <LanguageSwitcher />
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </>
    );
}
