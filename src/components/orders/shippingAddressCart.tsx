"use client";

import { ShippingAddress } from "@/actions/orders.action";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AddressI } from "@/types/address";
import { MapPin, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

type Props = {
    savedAddresses: AddressI[];
    onSelectAddress: (address: ShippingAddress & { name?: string }) => void;
};

export default function ShippingAddressCard({ savedAddresses: initialSavedAddresses, onSelectAddress }: Props) {
    const [addresses, setAddresses] = useState<AddressI[]>(initialSavedAddresses);
    const [selectedId, setSelectedId] = useState<string | null>(initialSavedAddresses[0]?._id || null);
    const [showNewForm, setShowNewForm] = useState(!initialSavedAddresses.length);
    const [newAddress, setNewAddress] = useState({
        name: "",
        details: "",
        phone: "",
        city: "",
    });
    const t = useTranslations("shippingAddress");
    const handleNewAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSaveNew = () => {
        const newAddr = {
            _id: `temp-${Date.now()}`, 
            ...newAddress,
        };
        setAddresses((prev) => [...prev, newAddr]);
        setSelectedId(newAddr._id);
        onSelectAddress(newAddr);

        setShowNewForm(false);
        setNewAddress({ name: "", details: "", phone: "", city: "" });
    };
    useEffect(() => {
        if (addresses.length > 0 && selectedId) {
            const addr = addresses.find((a) => a._id === selectedId);
            if (addr) onSelectAddress(addr);
        }
    }, [addresses, selectedId, onSelectAddress]);

    return (
        <Card className="p-6 rounded-2xl border-green-200">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-green-100 p-3 rounded-full">
                    <MapPin className="text-green-600" />
                </div>
                <h2 className="text-xl font-bold">{t("ShippingAddress")}</h2>
            </div>

            <p className="text-sm text-muted-foreground mb-4">
                {t("Address")}
            </p>
            {addresses.length > 0 && (
                <RadioGroup
                    value={selectedId || ""}
                    onValueChange={(id) => {
                        setSelectedId(id);
                        const addr = addresses.find((a) => a._id === id);
                        if (addr) onSelectAddress(addr);
                    }}
                    className="space-y-4 mb-6"
                >
                    {addresses.map((addr) => (
                        <div key={addr._id} className="flex items-start gap-3 border rounded-lg p-4">
                            <RadioGroupItem value={addr._id!} id={addr._id} />
                            <div>
                                <p className="font-medium">{addr.name}</p>
                                <p className="text-sm text-muted-foreground">{addr.details}</p>
                                <p className="text-sm text-muted-foreground">{addr.phone}</p>
                                <p className="text-sm text-muted-foreground">{addr.city}</p>
                            </div>
                        </div>
                    ))}
                </RadioGroup>
            )}
            <Button
                variant="outline"
                className="w-full justify-start gap-2 text-green-600 border-green-200"
                onClick={() => setShowNewForm(true)}
            >
                <Plus className="h-4 w-4" />
                {t("AddressSec")}
            </Button>
            {showNewForm && (
                <div className="mt-6 space-y-4 border-t pt-6">
                    <div className="space-y-2">
                        <Label>{t("AddressName")}</Label>
                        <Input
                            name="name"
                            value={newAddress.name}
                            onChange={handleNewAddressChange}
                            placeholder="e.g. Home, Office"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>{t("City")}</Label>
                        <Input
                            name="city"
                            value={newAddress.city}
                            onChange={handleNewAddressChange}
                            placeholder="e.g. Cairo, Alexandria, Giza"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>{t("StreetAddress")}</Label>
                        <Input
                            name="details"
                            value={newAddress.details}
                            onChange={handleNewAddressChange}
                            placeholder="Street name, building number, floor, apartment..."
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>{t("PhoneNumber")}</Label>
                        <Input
                            name="phone"
                            value={newAddress.phone}
                            onChange={handleNewAddressChange}
                            placeholder="01xxxxxxxxxx"
                        />
                    </div>
                    <div className="flex gap-4">
                        <Button variant="outline" className="flex-1" onClick={() => setShowNewForm(false)}>
                            {t("Cancel")}
                        </Button>
                        <Button
                            className="flex-1 bg-green-600 hover:bg-green-700"
                            onClick={handleSaveNew}
                            disabled={!newAddress.city || !newAddress.details || !newAddress.phone}
                        >
                            {t("SaveAdresses")}
                        </Button>
                    </div>
                </div>
            )}
        </Card>
    );
}