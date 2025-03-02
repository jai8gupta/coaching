import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { Button } from "./ui/button"


const CTADrawer = () => {
    return (
        <Drawer>
            <DrawerTrigger className="w-[280px] text-center ">Enroll Now</DrawerTrigger>
            <DrawerContent className="flex flex-col justify-start align-middle p-10">
                <DrawerHeader className="self-center">
                <DrawerTitle className="text-5xl">WHATSAPP US</DrawerTitle>
                <DrawerDescription className="text-3xl">Please connect with us at Ph. +91 {process.env.NEXT_PUBLIC_CONTACT_US_AT}</DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                <DrawerClose>
                    <span inert>OK</span>
                </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
            </Drawer>
    )
}

export default CTADrawer
