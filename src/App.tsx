import { useState, useEffect } from "react";
import { Search, User2, Trophy, Star, Activity, MapPin, Shield } from "lucide-react";

export default function App() {
  const [players, setPlayers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch("/players.json")
      .then((response) => response.json())
      .then((data) => setPlayers(data.Sheet1))
      .catch((error) => console.error("Error loading JSON:", error));
  }, []);

  const handleSearch = () => {
    setIsLoading(true);
    setTimeout(() => {
      const foundPlayer = players.find((player) =>
        player["Column 1"].toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSelectedPlayer(foundPlayer || null);
      setIsLoading(false);
    }, 600); // Add a slight delay for effect
  };

  return (
    <div className="football-field-bg min-h-screen flex flex-col items-center justify-start pt-16 p-4 text-white">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2 text-green-400 bounce-on-hover">
          Football Scout Pro
        </h1>
        <p className="text-gray-300 text-lg">Discover Elite Football Talent</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 bg-black/50 p-4 rounded-xl backdrop-blur-sm search-box-glow w-full max-w-md mx-auto">
        <input
          type="text"
          className="w-full sm:w-64 border-2 border-green-500 bg-black/30 p-3 rounded-lg 
                     text-white placeholder-gray-400 focus:outline-none focus:border-green-400
                     transition-all duration-300"
          placeholder="Search for a player..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button
          onClick={handleSearch}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg
                     flex items-center justify-center gap-2 transition-all duration-300 transform 
                     hover:scale-105 active:scale-95 w-full sm:w-auto"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
          ) : (
            <>
              <Search size={20} />
              <span>Search</span>
            </>
          )}
        </button>
      </div>

      {selectedPlayer && (
        <div className="mt-8 w-full max-w-2xl player-card-animate px-4">
          <div className="bg-black/70 backdrop-blur-md rounded-2xl p-6 border-2 border-green-500">
            <div className="flex flex-col sm:flex-row justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold text-green-400 mb-2">
                  {selectedPlayer["Column 1"]}
                </h2>
                <div className="flex items-center gap-2 text-gray-300">
                  <Shield size={16} />
                  <span>{selectedPlayer.Team}</span>
                </div>
              </div>
              <div className="bg-green-500 rounded-full p-3 text-2xl font-bold mt-4 sm:mt-0">
                {selectedPlayer.OVR}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User2 className="text-green-400" size={20} />
                  <div>
                    <p className="text-gray-400 text-sm">Position</p>
                    <p className="text-white">{selectedPlayer.Position} ({selectedPlayer["Alternative positions"]})</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Activity className="text-green-400" size={20} />
                  <div>
                    <p className="text-gray-400 text-sm">Age</p>
                    <p className="text-white">{selectedPlayer.Age} years</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="text-green-400" size={20} />
                  <div>
                    <p className="text-gray-400 text-sm">Nation</p>
                    <p className="text-white">{selectedPlayer.Nation}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Trophy className="text-green-400" size={20} />
                  <div>
                    <p className="text-gray-400 text-sm">League</p>
                    <p className="text-white">{selectedPlayer.League}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Star className="text-green-400" size={20} />
                  <div>
                    <p className="text-gray-400 text-sm">Play Style</p>
                    <p className="text-white">{selectedPlayer["play style"]}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-green-500/30 text-center sm:text-left">
              <a 
                href={selectedPlayer.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-3 
                         rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                View Full Profile
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}