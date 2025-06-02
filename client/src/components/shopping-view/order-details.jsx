import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";

function ShoppingOrderDetailsView () {
    return(
        <DialogContent className="sm:max-w-[600px]">
        <div className="grid gap-6">
          <div className="grid gap-2">
            <div className="flex mt-6 items-center justify-between">
              <p className="font-medium">Order ID</p>
              <Label></Label>
            </div>
            <div className="flex mt-2 items-center justify-between">
              <p className="font-medium">Order Date</p>
              <Label></Label>
            </div>
            <div className="flex mt-2 items-center justify-between">
              <p className="font-medium">Order Price</p>
              <Label>$</Label>
            </div>
            {/* <div className="flex mt-2 items-center justify-between">
              <p className="font-medium">Payment method</p>
              <Label></Label>
            </div>
            <div className="flex mt-2 items-center justify-between">
              <p className="font-medium">Payment Status</p>
              <Label></Label>
            </div> */}
            <div className="flex mt-2 items-center justify-between">
              <p className="font-medium">Order Status</p>
              <Label>
                <Badge className="py-1 px-3 bg-green-500">confirmed</Badge>
              </Label>
            </div>
          </div>
          <Separator />
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="font-medium">Order Details</div>
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span>Title: </span>
                  <span>Quantity: </span>
                  <span>Price: $</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="font-medium">Shipping Info</div>
              <div className="grid gap-0.5 text-muted-foreground">
                <span>dk</span>
                <span>abc</span>
                <span>surat</span>
                <span>395001</span>
                <span>1234567890</span>
                <span>test note...</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    )
}

export default ShoppingOrderDetailsView;