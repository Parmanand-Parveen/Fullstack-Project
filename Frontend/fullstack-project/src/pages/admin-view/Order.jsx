import { useToast } from "@/hooks/use-toast";
import { PackageOpen } from "lucide-react";
import React from "react";

function AdminOrder() {
  const { toast } = useToast()
  return (
    <div>
      <header className="flex w-full justify-between items-center px-5 py-3 border-b border-zinc-700">
        <div className="flex items-center gap-2 py-3">
          <PackageOpen /> Order
        </div>
      </header>
      <button onClick={() => { toast({ title: "Order", description: "Order Placed Successfully",variant: "destructive" , position: "top-right",
        duration: 1000,
       })}}></button>
    </div> 
  );
}

export default AdminOrder;
