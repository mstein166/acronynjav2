import React from "react"
import AcronynjaGame from "../components/acronynja-game";
import AcronynjaNinja from "../components/acronynja-game";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <AcronynjaNinja />
        </main>
    )
}