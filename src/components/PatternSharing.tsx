import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PatternSharing() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Share Your Pattern</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Button>Export Pattern</Button>
          <Button>Share to Community</Button>
        </div>
      </CardContent>
    </Card>
  )
}