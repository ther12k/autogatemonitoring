import React from "react";
import Router from "./routers/index";
// import './App.css'; // Optionally include if App.css has styles you need beyond Tailwind

function App() {
    return (
        // The className here might be redundant if your layout component handles this.
        // Or, if you want a global wrapper with these styles, it's fine.
        // <div className="min-h-screen bg-background text-foreground">
            <Router />
        // </div>
    );
}

export default App;