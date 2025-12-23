"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { registerForInstitute } from "@/app/actions";

const formSchema = z.object({
  pangalan: z.string().min(2, "Kinakailangan ang buong pangalan."),
  email: z.string().email("Kinakailangan ang valid na email address.").optional().or(z.literal("")),
  palayaw: z.string().min(2, "Kinakailangan ang palayaw."),
  kaarawan: z.string().min(1, "Kinakailangan ang kaarawan."),
  edad: z.string().min(1, "Kinakailangan ang edad."),
  kasarian: z.enum(["Lalaki", "Babae"], {
    required_error: "Kailangan mong pumili ng kasarian.",
  }),
  tirahan: z.string().min(5, "Kinakailangan ang tirahan."),
  contactNumber: z.string().min(10, "Kinakailangan ang contact number."),
  inabot: z.string().min(2, "Kinakailangan ang inabot na pag-aaral."),
  tatay: z.string().min(2, "Kinakailangan ang pangalan ng tatay."),
  nanay: z.string().min(2, "Kinakailangan ang pangalan ng nanay."),
  localChurch: z.string().min(2, "Kinakailangan ang lokal na simbahan."),
  kasapian: z.enum(["Baptized", "Professing"], {
    required_error: "Kailangan mong pumili ng kasapian.",
  }),
  posisyonIglesya: z.string().optional(),
  posisyonOrganisasyon: z.string().optional(),
  ilangBeses: z.string().min(1, "Kinakailangan ang sagot kung ilang beses nang nakadalo."),
  mgaInaasahan: z.string().min(5, "Kinakailangan ang iyong mga inaasahan."),
  ambagCash: z.string().optional(),
  ambagRice: z.string().optional(),
  ambagInKinds: z.string().optional(),
  plato: z.boolean().default(false),
  kutsara: z.boolean().default(false),
  baso: z.boolean().default(false),
  beddings: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

export function RegistrationForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pangalan: "",
      email: "",
      palayaw: "",
      kaarawan: "",
      edad: "",
      tirahan: "",
      contactNumber: "",
      inabot: "",
      tatay: "",
      nanay: "",
      localChurch: "",
      posisyonIglesya: "",
      posisyonOrganisasyon: "",
      ilangBeses: "",
      mgaInaasahan: "",
      ambagCash: "",
      ambagRice: "",
      ambagInKinds: "",
      plato: false,
      kutsara: false,
      baso: false,
      beddings: false,
    },
  });

  function onSubmit(values: FormValues) {
    startTransition(async () => {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, typeof value === 'boolean' ? String(value) : value);
      });

      const result = await registerForInstitute(null, formData);

      if (result.errors && Object.keys(result.errors).length > 0) {
        Object.entries(result.errors).forEach(([field, messages]) => {
          if (Array.isArray(messages) && messages.length > 0) {
            form.setError(field as keyof FormValues, {
              type: "manual",
              message: messages.join(", "),
            });
          }
        });
        toast({
          variant: "destructive",
          title: "Uh oh! May nagkamali.",
          description: result.message || "Pakisuri ang iyong input.",
        });
      } else if (result.message) {
        toast({
          title: "Matagumpay ang Pagpaparehistro!",
          description: result.message,
        });
        form.reset();
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 text-left"
      >
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Personal Information</h3>
          
          <FormField
            control={form.control}
            name="pangalan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pangalan (Full Name)</FormLabel>
                <FormControl>
                  <Input placeholder="Juan dela Cruz" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address (Optional)</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="juan@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="palayaw"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Palayaw (Nickname)</FormLabel>
                  <FormControl>
                    <Input placeholder="Juan" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="kaarawan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kaarawan (Birthday)</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="edad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Edad (Age)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="18" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="kasarian"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Kasarian (Gender)</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex flex-row space-x-4"
                    >
                      <div className="flex items-center space-x-3 cursor-pointer p-2 rounded hover:bg-accent/10">
                        <RadioGroupItem value="Lalaki" id="lalaki" />
                        <label htmlFor="lalaki" className="font-normal cursor-pointer">
                          Lalaki
                        </label>
                      </div>
                      <div className="flex items-center space-x-3 cursor-pointer p-2 rounded hover:bg-accent/10">
                        <RadioGroupItem value="Babae" id="babae" />
                        <label htmlFor="babae" className="font-normal cursor-pointer">
                          Babae
                        </label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="tirahan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tirahan (Address)</FormLabel>
                <FormControl>
                  <Input placeholder="123 Main St, City" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Number</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="09123456789" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="inabot"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Inabot na Pag-aaral (Educational Attainment)</FormLabel>
                <FormControl>
                  <Input placeholder="College Graduate" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="tatay"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pangalan ng Tatay (Father's Name)</FormLabel>
                  <FormControl>
                    <Input placeholder="Pedro dela Cruz" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nanay"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pangalan ng Nanay (Mother's Name)</FormLabel>
                  <FormControl>
                    <Input placeholder="Maria dela Cruz" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Church Information</h3>
          
          <FormField
            control={form.control}
            name="localChurch"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Iglesya Lokal (Local Church)</FormLabel>
                <FormControl>
                  <Input placeholder="St. Luke UMC" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="kasapian"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Kasapian (Membership)</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4"
                  >
                    <div className="flex items-center space-x-3 cursor-pointer p-2 rounded hover:bg-accent/10">
                      <RadioGroupItem value="Baptized" id="baptized-member" />
                      <label htmlFor="baptized-member" className="font-normal cursor-pointer flex-1">
                        Baptized Member
                      </label>
                    </div>
                    <div className="flex items-center space-x-3 cursor-pointer p-2 rounded hover:bg-accent/10">
                      <RadioGroupItem value="Professing" id="professing-member" />
                      <label htmlFor="professing-member" className="font-normal cursor-pointer flex-1">
                        Professing Member
                      </label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="posisyonIglesya"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Posisyon sa Iglesya Lokal (Church Position)</FormLabel>
                  <FormControl>
                    <Input placeholder="Optional" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="posisyonOrganisasyon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Posisyon sa Organisasyon (Organization Position)</FormLabel>
                  <FormControl>
                    <Input placeholder="Optional" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Event Information</h3>
          
          <FormField
            control={form.control}
            name="ilangBeses"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ilang beses nang dumadalo sa gawaing ito?</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pumili ng bilang" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent position="popper" className="max-h-[300px]">
                    <SelectItem value="Una">Una (1st time)</SelectItem>
                    <SelectItem value="Pangalawa">Pangalawa (2nd time)</SelectItem>
                    <SelectItem value="Pangatlo">Pangatlo (3rd time)</SelectItem>
                    <SelectItem value="Pang-apat">Pang-apat (4th time)</SelectItem>
                    <SelectItem value="Pang-lima">Pang-lima (5th time)</SelectItem>
                    <SelectItem value="Pang-anim">Pang-anim pataas (6+ times)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mgaInaasahan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Inaasahan sa Gawaing Ito</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Ano ang iyong mga inaasahan sa pagdalo sa gawaing ito?"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Ambag sa Gawain (Contribution)</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="ambagCash"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Registration Fee (in PHP)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ambagRice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rice (kilos)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ambagInKinds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>In-Kinds (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Pera/Pagkain/Gamit" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Mga Gamit na Dala (Items to Bring)</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="plato"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="h-4 w-4"
                    />
                  </FormControl>
                  <FormLabel className="font-normal">Plato</FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="kutsara"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="h-4 w-4"
                    />
                  </FormControl>
                  <FormLabel className="font-normal">Kutsara</FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="baso"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="h-4 w-4"
                    />
                  </FormControl>
                  <FormLabel className="font-normal">Baso</FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="beddings"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2 space-y-0">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      className="h-4 w-4"
                    />
                  </FormControl>
                  <FormLabel className="font-normal">Beddings</FormLabel>
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Submitting..." : "Submit"}
        </Button>

        <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
          <p className="text-sm text-gray-700 text-center">
            By submitting your response to the registration, you agree to the{" "}
            <a 
              href="/terms" 
              target="_blank" 
              className="text-blue-600 hover:text-blue-800 underline"
            >
              terms and conditions
            </a>
            {" "}and{" "}
            <a 
              href="/privacy" 
              target="_blank" 
              className="text-blue-600 hover:text-blue-800 underline"
            >
              privacy policy
            </a>
            {" "}of the Christmas Institute 2025.
          </p>
        </div>
      </form>
    </Form>
  );
}
