"use server";

import { z } from "zod";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { cookies } from "next/headers";

const loginSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

const registrationSchema = z.object({
  pangalan: z.string().min(2, "Kinakailangan ang buong pangalan."),
  email: z.string().email("Kinakailangan ang valid na email address."),
  palayaw: z.string().min(2, "Kinakailangan ang palayaw."),
  kaarawan: z.string().min(1, "Kinakailangan ang kaarawan."),
  edad: z.string().min(1, "Kinakailangan ang edad."),
  kasarian: z.enum(["Lalaki", "Babae"]),
  tirahan: z.string().min(5, "Kinakailangan ang tirahan."),
  contactNumber: z.string().min(10, "Kinakailangan ang contact number."),
  inabot: z.string().min(2, "Kinakailangan ang inabot na pag-aaral."),
  tatay: z.string().min(2, "Kinakailangan ang pangalan ng tatay."),
  nanay: z.string().min(2, "Kinakailangan ang pangalan ng nanay."),
  localChurch: z.string().min(2, "Kinakailangan ang lokal na simbahan."),
  kasapian: z.enum(["Baptized", "Professing"]),
  posisyonIglesya: z.string().optional(),
  posisyonOrganisasyon: z.string().optional(),
  ilangBeses: z.string().min(1, "Kinakailangan ang sagot kung ilang beses nang nakadalo."),
  mgaInaasahan: z.string().min(5, "Kinakailangan ang iyong mga inaasahan."),
  ambagCash: z.string().optional(),
  ambagRice: z.string().optional(),
  ambagInKinds: z.string().optional(),
  plato: z.string().optional(),
  kutsara: z.string().optional(),
  baso: z.string().optional(),
  beddings: z.string().optional(),
});

type State = {
  errors?: {
    [key: string]: string[] | undefined;
  };
  message?: string | null;
};

type LoginState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string | null;
  success?: boolean;
};

export async function loginOfficer(
  prevState: LoginState | null,
  formData: FormData
): Promise<LoginState> {
  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please check your input and try again.",
    };
  }

  try {
    // Call the client-side auth endpoint
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validatedFields.data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        message: result.error || "Login failed. Please try again.",
      };
    }

    return {
      success: true,
      message: "Login successful!",
    };
  } catch (e) {
    console.error("Login error: ", e);
    return {
      message: "An error occurred during login. Please try again.",
    };
  }
}

export async function registerForInstitute(
  prevState: State | null,
  formData: FormData
): Promise<State> {
  const validatedFields = registrationSchema.safeParse({
    pangalan: formData.get("pangalan"),
    email: formData.get("email"),
    palayaw: formData.get("palayaw"),
    kaarawan: formData.get("kaarawan"),
    edad: formData.get("edad"),
    kasarian: formData.get("kasarian"),
    tirahan: formData.get("tirahan"),
    contactNumber: formData.get("contactNumber"),
    inabot: formData.get("inabot"),
    tatay: formData.get("tatay"),
    nanay: formData.get("nanay"),
    localChurch: formData.get("localChurch"),
    kasapian: formData.get("kasapian"),
    posisyonIglesya: formData.get("posisyonIglesya"),
    posisyonOrganisasyon: formData.get("posisyonOrganisasyon"),
    ilangBeses: formData.get("ilangBeses"),
    mgaInaasahan: formData.get("mgaInaasahan"),
    ambagCash: formData.get("ambagCash"),
    ambagRice: formData.get("ambagRice"),
    ambagInKinds: formData.get("ambagInKinds"),
    plato: formData.get("plato"),
    kutsara: formData.get("kutsara"),
    baso: formData.get("baso"),
    beddings: formData.get("beddings"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Error: Pakisuri ang iyong input at subukang muli.",
    };
  }

  try {
    const docRef = await addDoc(collection(db, "registrations"), validatedFields.data);
    console.log("Document written with ID: ", docRef.id);
    return {
      message: `Tagumpay! Maligayang pagdating, ${validatedFields.data.palayaw}!`,
    };
  } catch (e) {
    console.error("Error adding document: ", e);
    return {
      message: "Error: Hindi matagumpay ang pagpaparehistro. Pakisubukang muli.",
    };
  }
}

type UpdateState = {
  errors?: {
    [key: string]: string[] | undefined;
  };
  message?: string | null;
  success?: boolean;
};

export async function updateRegistration(
  id: string,
  prevState: UpdateState | null,
  formData: FormData
): Promise<UpdateState> {
  const validatedFields = registrationSchema.safeParse({
    pangalan: formData.get("pangalan"),
    palayaw: formData.get("palayaw"),
    edad: formData.get("edad"),
    kasarian: formData.get("kasarian"),
    contactNumber: formData.get("contactNumber"),
    localChurch: formData.get("localChurch"),
    kasapian: formData.get("kasapian"),
    ilangBeses: formData.get("ilangBeses"),
    mgaInaasahan: formData.get("mgaInaasahan"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Error: Please check your input and try again.",
    };
  }

  try {
    const { doc, updateDoc } = await import("firebase/firestore");
    await updateDoc(doc(db, "registrations", id), validatedFields.data);
    return {
      success: true,
      message: "Registration updated successfully!",
    };
  } catch (e) {
    console.error("Error updating document: ", e);
    return {
      message: "Error: Failed to update registration. Please try again.",
    };
  }
}

export async function deleteRegistration(id: string): Promise<{ success: boolean; message: string }> {
  try {
    const { doc, deleteDoc } = await import("firebase/firestore");
    await deleteDoc(doc(db, "registrations", id));
    return {
      success: true,
      message: "Registration deleted successfully!",
    };
  } catch (e) {
    console.error("Error deleting document: ", e);
    return {
      success: false,
      message: "Error: Failed to delete registration. Please try again.",
    };
  }
}
