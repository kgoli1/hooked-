import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCrochetGrid } from './hooks/useCrochetGrid'
import PatternSharing from './components/PatternSharing'
import CommunityForum from './components/CommunityForum'
import UserProfile from './components/UserProfile'

export default function App() {
  const { grid, gridSize, currentColor, setCurrentColor, updateCell, resetGrid, currentStitch, setCurrentStitch } = useCrochetGrid(10)
  const [newSize, setNewSize] = useState(10)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Crochet Pattern Designer</h1>
      
      <Tabs defaultValue="editor" className="w-full">
        <TabsList className="flex flex-wrap gap-2 mb-4">
          <TabsTrigger value="editor">Pattern Editor</TabsTrigger>
          <TabsTrigger value="sharing">Pattern Sharing</TabsTrigger>
          <TabsTrigger value="forum">Community Forum</TabsTrigger>
          <TabsTrigger value="profile">User Profile</TabsTrigger>
        </TabsList>
        
        <TabsContent value="editor">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div>
                <Label htmlFor="color-picker">Select Color:</Label>
                <Input
                  id="color-picker"
                  type="color"
                  value={currentColor}
                  onChange={(e) => setCurrentColor(e.target.value)}
                  className="w-20 h-10"
                />
              </div>

              <div>
                <Label htmlFor="stitch-type">Stitch Type:</Label>
                <select
                  id="stitch-type"
                  value={currentStitch}
                  onChange={(e) => setCurrentStitch(e.target.value)}
                  className="ml-2 p-2 border rounded"
                >
                  <option value="sc">Single Crochet</option>
                  <option value="dc">Double Crochet</option>
                  <option value="tr">Treble Crochet</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <Label htmlFor="grid-size">Grid Size:</Label>
                <Input
                  id="grid-size"
                  type="number"
                  min="1"
                  max="50"
                  value={newSize}
                  onChange={(e) => setNewSize(Number(e.target.value))}
                  className="w-20"
                />
                <Button onClick={() => resetGrid(newSize)}>Update Grid</Button>
              </div>
            </div>

            <div 
              className="grid gap-1 border border-gray-200 p-4 rounded-lg"
              style={{ 
                gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
                width: 'fit-content'
              }}
            >
              {grid.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className="w-8 h-8 border border-gray-300 cursor-pointer flex items-center justify-center hover:border-gray-400 transition-colors"
                    style={{ backgroundColor: cell.color }}
                    onClick={() => updateCell(rowIndex, colIndex)}
                  >
                    <span className="text-xs select-none" style={{ color: getContrastColor(cell.color) }}>
                      {cell.stitch}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="sharing"><PatternSharing /></TabsContent>
        <TabsContent value="forum"><CommunityForum /></TabsContent>
        <TabsContent value="profile"><UserProfile /></TabsContent>
      </Tabs>
    </div>
  )
}

// Helper function to determine text color based on background
function getContrastColor(hexcolor: string) {
  const r = parseInt(hexcolor.slice(1, 3), 16);
  const g = parseInt(hexcolor.slice(3, 5), 16);
  const b = parseInt(hexcolor.slice(5, 7), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? '#000000' : '#ffffff';
}