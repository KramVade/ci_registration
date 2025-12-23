"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

type Registration = {
  id: string;
  pangalan: string;
  email: string;
  palayaw: string;
  kaarawan: string;
  edad: string;
  kasarian: string;
  tirahan: string;
  contactNumber: string;
  inabot: string;
  tatay: string;
  nanay: string;
  localChurch: string;
  kasapian: string;
  posisyonIglesya?: string;
  posisyonOrganisasyon?: string;
  ilangBeses: string;
  mgaInaasahan: string;
  ambagCash?: string;
  ambagRice?: string;
  ambagInKinds?: string;
  plato?: string;
  kutsara?: string;
  baso?: string;
  beddings?: string;
};

type EditRegistrationDialogProps = {
  registration: Registration | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (id: string, data: Omit<Registration, "id">) => Promise<void>;
};

export function EditRegistrationDialog({
  registration,
  open,
  onOpenChange,
  onSave,
}: EditRegistrationDialogProps) {
  const [formData, setFormData] = useState<Omit<Registration, "id">>({
    pangalan: "",
    email: "",
    palayaw: "",
    kaarawan: "",
    edad: "",
    kasarian: "Lalaki",
    tirahan: "",
    contactNumber: "",
    inabot: "",
    tatay: "",
    nanay: "",
    localChurch: "",
    kasapian: "Baptized",
    posisyonIglesya: "",
    posisyonOrganisasyon: "",
    ilangBeses: "",
    mgaInaasahan: "",
    ambagCash: "",
    ambagRice: "",
    ambagInKinds: "",
    plato: "",
    kutsara: "",
    baso: "",
    beddings: "",
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (registration) {
      setFormData({
        pangalan: registration.pangalan,
        email: registration.email,
        palayaw: registration.palayaw,
        kaarawan: registration.kaarawan,
        edad: registration.edad,
        kasarian: registration.kasarian,
        tirahan: registration.tirahan,
        contactNumber: registration.contactNumber,
        inabot: registration.inabot,
        tatay: registration.tatay,
        nanay: registration.nanay,
        localChurch: registration.localChurch,
        kasapian: registration.kasapian,
        posisyonIglesya: registration.posisyonIglesya,
        posisyonOrganisasyon: registration.posisyonOrganisasyon,
        ilangBeses: registration.ilangBeses,
        mgaInaasahan: registration.mgaInaasahan,
        ambagCash: registration.ambagCash,
        ambagRice: registration.ambagRice,
        ambagInKinds: registration.ambagInKinds,
        plato: registration.plato,
        kutsara: registration.kutsara,
        baso: registration.baso,
        beddings: registration.beddings,
      });
    }
  }, [registration]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registration) return;

    setIsSaving(true);
    try {
      await onSave(registration.id, formData);
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Registration</DialogTitle>
          <DialogDescription>
            Update the registration details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              
              <div className="grid gap-2">
                <Label htmlFor="pangalan">Pangalan (Full Name)</Label>
                <Input
                  id="pangalan"
                  value={formData.pangalan}
                  onChange={(e) => setFormData({ ...formData, pangalan: e.target.value })}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="palayaw">Palayaw (Nickname)</Label>
                  <Input
                    id="palayaw"
                    value={formData.palayaw}
                    onChange={(e) => setFormData({ ...formData, palayaw: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="kaarawan">Kaarawan (Birthday)</Label>
                  <Input
                    id="kaarawan"
                    type="date"
                    value={formData.kaarawan}
                    onChange={(e) => setFormData({ ...formData, kaarawan: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edad">Edad (Age)</Label>
                  <Input
                    id="edad"
                    type="number"
                    value={formData.edad}
                    onChange={(e) => setFormData({ ...formData, edad: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Kasarian (Gender)</Label>
                  <RadioGroup
                    value={formData.kasarian}
                    onValueChange={(value) => setFormData({ ...formData, kasarian: value })}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Lalaki" id="lalaki" />
                      <Label htmlFor="lalaki">Lalaki</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Babae" id="babae" />
                      <Label htmlFor="babae">Babae</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="tirahan">Tirahan (Address)</Label>
                <Input
                  id="tirahan"
                  value={formData.tirahan}
                  onChange={(e) => setFormData({ ...formData, tirahan: e.target.value })}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="contactNumber">Contact Number</Label>
                <Input
                  id="contactNumber"
                  value={formData.contactNumber}
                  onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="inabot">Inabot na Pag-aaral (Educational Attainment)</Label>
                <Input
                  id="inabot"
                  value={formData.inabot}
                  onChange={(e) => setFormData({ ...formData, inabot: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="tatay">Pangalan ng Tatay</Label>
                  <Input
                    id="tatay"
                    value={formData.tatay}
                    onChange={(e) => setFormData({ ...formData, tatay: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="nanay">Pangalan ng Nanay</Label>
                  <Input
                    id="nanay"
                    value={formData.nanay}
                    onChange={(e) => setFormData({ ...formData, nanay: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Church Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Church Information</h3>
              
              <div className="grid gap-2">
                <Label htmlFor="localChurch">Iglesya Lokal (Local Church)</Label>
                <Input
                  id="localChurch"
                  value={formData.localChurch}
                  onChange={(e) => setFormData({ ...formData, localChurch: e.target.value })}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label>Kasapian (Membership)</Label>
                <RadioGroup
                  value={formData.kasapian}
                  onValueChange={(value) => setFormData({ ...formData, kasapian: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Baptized" id="baptized" />
                    <Label htmlFor="baptized">Baptized Member</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Professing" id="professing" />
                    <Label htmlFor="professing">Professing Member</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="posisyonIglesya">Posisyon sa Iglesya Lokal</Label>
                  <Input
                    id="posisyonIglesya"
                    value={formData.posisyonIglesya || ""}
                    onChange={(e) => setFormData({ ...formData, posisyonIglesya: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="posisyonOrganisasyon">Posisyon sa Organisasyon</Label>
                  <Input
                    id="posisyonOrganisasyon"
                    value={formData.posisyonOrganisasyon || ""}
                    onChange={(e) => setFormData({ ...formData, posisyonOrganisasyon: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Event Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Event Information</h3>
              
              <div className="grid gap-2">
                <Label htmlFor="ilangBeses">Ilang beses nang dumadalo sa gawaing ito?</Label>
                <Input
                  id="ilangBeses"
                  value={formData.ilangBeses}
                  onChange={(e) => setFormData({ ...formData, ilangBeses: e.target.value })}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="mgaInaasahan">Inaasahan sa Gawaing Ito</Label>
                <Textarea
                  id="mgaInaasahan"
                  value={formData.mgaInaasahan}
                  onChange={(e) => setFormData({ ...formData, mgaInaasahan: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Ambag */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Ambag sa Gawain</h3>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="ambagCash">Cash (PHP)</Label>
                  <Input
                    id="ambagCash"
                    type="number"
                    value={formData.ambagCash || ""}
                    onChange={(e) => setFormData({ ...formData, ambagCash: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="ambagRice">Rice (kilos)</Label>
                  <Input
                    id="ambagRice"
                    type="number"
                    value={formData.ambagRice || ""}
                    onChange={(e) => setFormData({ ...formData, ambagRice: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="ambagInKinds">In-Kinds</Label>
                  <Input
                    id="ambagInKinds"
                    value={formData.ambagInKinds || ""}
                    onChange={(e) => setFormData({ ...formData, ambagInKinds: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Mga Gamit */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Mga Gamit na Dala</h3>
              
              <div className="grid grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="plato"
                    checked={formData.plato === "true"}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, plato: checked ? "true" : "false" })
                    }
                  />
                  <Label htmlFor="plato">Plato</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="kutsara"
                    checked={formData.kutsara === "true"}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, kutsara: checked ? "true" : "false" })
                    }
                  />
                  <Label htmlFor="kutsara">Kutsara</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="baso"
                    checked={formData.baso === "true"}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, baso: checked ? "true" : "false" })
                    }
                  />
                  <Label htmlFor="baso">Baso</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="beddings"
                    checked={formData.beddings === "true"}
                    onCheckedChange={(checked) => 
                      setFormData({ ...formData, beddings: checked ? "true" : "false" })
                    }
                  />
                  <Label htmlFor="beddings">Beddings</Label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
