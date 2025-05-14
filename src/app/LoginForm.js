"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

export function LoginForm({ className, ...props }) {
  const router = useRouter()
  const handleSubmit= () => {
    router.push("/host")
  }
  return (
    <div className="flex flex-col gap-6" {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Welcome to Interfo</CardTitle>
          <CardDescription>
            Enter your wifi information below to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
              <div className="grid gap-2">
                <Label htmlFor="email">Wifi admin URL</Label>
                <Input
                  id="email"
                  type="url"
                  placeholder="192.168.1.1"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="connectify-csc"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-sm">
            <span className="font-semibold">Note:</span>The url provided should
            not include http:// or https:// or www.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

