<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MovieStream - Anime Player</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);
            color: #fff;
            min-height: 100vh;
            overflow-x: hidden;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .logo {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        .logo i {
            font-size: 32px;
            color: #4e54c8;
        }
        
        .logo h1 {
            font-size: 28px;
            font-weight: 700;
            background: linear-gradient(90deg, #4e54c8, #8f94fb);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .search-container {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 20px;
        }
        
        .search-input {
            flex: 1;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 50px;
            padding: 12px 20px;
            color: white;
            font-size: 16px;
        }
        
        .search-input::placeholder {
            color: rgba(255, 255, 255, 0.6);
        }
        
        .search-button {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 50px;
            padding: 12px 20px;
            color: white;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .search-button:hover {
            background: rgba(255, 255, 255, 0.15);
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }
        
        .search-results {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .search-result {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 8px;
            overflow: hidden;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .search-result:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
        }
        
        .result-poster {
            width: 100%;
            height: 300px;
            object-fit: cover;
        }
        
        .result-info {
            padding: 15px;
        }
        
        .result-title {
            font-weight: 600;
            margin-bottom: 5px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        
        .result-year {
            font-size: 14px;
            opacity: 0.7;
        }
        
        .result-type {
            font-size: 12px;
            background: rgba(78, 84, 200, 0.3);
            padding: 2px 8px;
            border-radius: 4px;
            display: inline-block;
            margin-top: 5px;
        }
        
        .server-selector {
            margin-bottom: 20px;
            text-align: center;
        }
        
        .server-dropdown {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            padding: 12px 20px;
            color: white;
            cursor: pointer;
            display: inline-block;
            min-width: 250px;
            position: relative;
        }
        
        .server-dropdown-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .server-dropdown-list {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(30, 30, 46, 0.95);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            margin-top: 5px;
            overflow: hidden;
            z-index: 10;
            max-height: 200px;
            overflow-y: auto;
        }
        
        .server-option {
            padding: 10px 15px;
            transition: all 0.3s ease;
            cursor: pointer;
        }
        
        .server-option:hover {
            background: rgba(78, 84, 200, 0.3);
        }
        
        .server-option.active {
            background: rgba(78, 84, 200, 0.5);
        }
        
        .episode-nav {
            display: flex;
            flex-direction: column;
            gap: 15px;
            margin-bottom: 20px;
            padding: 15px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .episode-nav-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .episode-nav-title {
            font-size: 18px;
            font-weight: 600;
            color: #8f94fb;
        }
        
        .season-selector {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            padding: 8px 15px;
            color: white;
            cursor: pointer;
        }
        
        .episode-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
            gap: 10px;
            max-height: 300px;
            overflow-y: auto;
            padding: 10px;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 8px;
        }
        
        .episode-grid::-webkit-scrollbar {
            width: 6px;
        }
        
        .episode-grid::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px;
        }
        
        .episode-grid::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 10px;
        }
        
        .episode-button {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 6px;
            padding: 10px 5px;
            color: white;
            cursor: pointer;
            transition: all 0.3s ease;
            text-align: center;
            font-size: 14px;
        }
        
        .episode-button:hover {
            background: rgba(255, 255, 255, 0.15);
            transform: translateY(-2px);
        }
        
        .episode-button.active {
            background: rgba(78, 84, 200, 0.4);
            border-color: #4e54c8;
            box-shadow: 0 0 10px rgba(78, 84, 200, 0.5);
        }
        
        .player-container {
            margin-top: 30px;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
            background: #000;
            position: relative;
        }
        
        .player-header {
            background: rgba(30, 30, 46, 0.9);
            padding: 15px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .movie-title {
            font-size: 20px;
            font-weight: 600;
        }
        
        .current-server {
            display: flex;
            align-items: center;
            gap: 10px;
            background: rgba(255, 255, 255, 0.1);
            padding: 8px 15px;
            border-radius: 50px;
            font-size: 14px;
        }
        
        .video-container {
            position: relative;
            width: 100%;
            height: 0;
            padding-bottom: 56.25%; /* 16:9 aspect ratio */
        }
        
        .video-player {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: none;
            background: #000;
        }
        
        .server-notice {
            text-align: center;
            padding: 20px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 8px;
            margin-top: 20px;
            font-size: 14px;
            opacity: 0.8;
        }
        
        .server-notice i {
            color: #4e54c8;
            margin-right: 8px;
        }
        
        .hidden {
            display: none;
        }
        
        .loading {
            text-align: center;
            padding: 20px;
            color: #8f94fb;
        }
        
        .error-message {
            text-align: center;
            padding: 20px;
            color: #ff6b6b;
            background: rgba(255, 107, 107, 0.1);
            border-radius: 8px;
            margin: 10px 0;
        }
        
        @media (max-width: 768px) {
            header {
                flex-direction: column;
                gap: 15px;
                text-align: center;
            }
            
            .episode-grid {
                grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
            }
            
            .server-dropdown {
                min-width: 200px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <div class="logo">
                <i class="fas fa-film"></i>
                <h1>MovieStream - Anime Player</h1>
            </div>
            
            <div class="search-container">
                <input type="text" class="search-input" id="search-input" placeholder="Search for anime...">
                <button class="search-button" id="search-button">
                    <i class="fas fa-search"></i> Search
                </button>
            </div>
        </header>
        
        <div class="search-results hidden" id="search-results"></div>
        
        <div class="episode-nav hidden" id="episode-nav">
            <div class="episode-nav-header">
                <div class="episode-nav-title">Episodes</div>
                <select class="season-selector" id="season-selector">
                    <option value="1">Season 1</option>
                </select>
            </div>
            <div class="episode-grid" id="episode-grid">
                <!-- Episode buttons will be generated here -->
            </div>
        </div>
        
        <div class="server-selector">
            <div class="server-dropdown" id="server-dropdown">
                <div class="server-dropdown-header">
                    <span id="selected-server">Select a server</span>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="server-dropdown-list hidden" id="server-list">
                    <!-- Server options will be populated here -->
                </div>
            </div>
        </div>
        
        <div class="player-container">
            <div class="player-header">
                <div class="movie-title" id="movie-title">Select an anime to start streaming</div>
                <div class="current-server">
                    <i class="fas fa-server"></i>
                    <span id="current-server-name">Select a server</span>
                </div>
            </div>
            
            <div class="video-container">
                <div class="video-player" id="video-player">
                    <div style="display: flex; justify-content: center; align-items: center; height: 100%; background: #000;">
                        <div style="text-align: center;">
                            <i class="fas fa-film" style="font-size: 64px; color: #4e54c8; margin-bottom: 20px;"></i>
                            <p>Select an anime and episode to start streaming</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="server-notice">
            <i class="fas fa-info-circle"></i>
            Use the search bar to find anime. Select an episode and the player will automatically load from the selected server.
        </div>
    </div>

    <script>
        // TMDB API Configuration
        const TMDB_API_KEY = '6fad3f86b8452ee232deb7977d7dcf58';
        const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
        const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
        
        // English servers list
        const englishServers = [
            { name: "MegaPlay - English Dub", type: "dub", category: "dub" },
            { name: "MegaPlay - English Sub", type: "sub", category: "sub" },
            { name: "AnimeFlix - English Dub", type: "dub", category: "dub" },
            { name: "AnimeFlix - English Sub", type: "sub", category: "sub" },
            { name: "StreamAnime - English Dub", type: "dub", category: "dub" },
            { name: "StreamAnime - English Sub", type: "sub", category: "sub" },
            { name: "AnimeHub - English Dub", type: "dub", category: "dub" },
            { name: "AnimeHub - English Sub", type: "sub", category: "sub" }
        ];
        
        // Anime database - will be loaded from external URL
        let animeDatabase = [];
        
        // Current selected content
        let currentContent = null;
        let currentSeason = 1;
        let currentEpisode = 1;
        let currentServer = englishServers[0]; // Default to first server
        let allSeasons = [];
        
        // Load anime data from external URL
        function loadAnimeData() {
            fetch('https://cdn.jsdelivr.net/gh/danka1567/animejs@main/anime.js')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text();
                })
                .then(data => {
                    // Extract the anime data from the JavaScript file
                    // The data is in a variable called animeData
                    const animeDataMatch = data.match(/var animeData\s*=\s*(\[.*?\]);/s);
                    if (animeDataMatch && animeDataMatch[1]) {
                        try {
                            animeDatabase = JSON.parse(animeDataMatch[1]);
                            console.log('Anime data loaded successfully:', animeDatabase.length, 'anime');
                        } catch (e) {
                            console.error('Error parsing anime data:', e);
                            // Fallback to a minimal dataset if parsing fails
                            animeDatabase = [
                                {
                                    "name": "fullmetal-alchemist-brotherhood-1?",
                                    "tmdb_id": 25425,
                                    "year": 2009,
                                    "episodes": "1-64",
                                    "episode_offset": 0
                                },
                                {
                                    "name": "hunter-x-hunter-2?",
                                    "tmdb_id": 46298,
                                    "year": 2011,
                                    "episodes": "65-212",
                                    "episode_offset": 64
                                },
                                {
                                    "name": "steinsgate-3?",
                                    "tmdb_id": 42509,
                                    "year": 2011,
                                    "episodes": "213-236",
                                    "episode_offset": 212
                                }
                            ];
                        }
                    } else {
                        console.error('Could not find animeData in the loaded file');
                        // Fallback to a minimal dataset
                        animeDatabase = [
                            {
                                "name": "fullmetal-alchemist-brotherhood-1?",
                                "tmdb_id": 25425,
                                "year": 2009,
                                "episodes": "1-64",
                                "episode_offset": 0
                            },
                            {
                                "name": "hunter-x-hunter-2?",
                                "tmdb_id": 46298,
                                "year": 2011,
                                "episodes": "65-212",
                                "episode_offset": 64
                            },
                            {
                                "name": "steinsgate-3?",
                                "tmdb_id": 42509,
                                "year": 2011,
                                "episodes": "213-236",
                                "episode_offset": 212
                            }
                        ];
                    }
                })
                .catch(error => {
                    console.error('Error loading anime data:', error);
                    // Fallback to a minimal dataset
                    animeDatabase = [
                        {
                            "name": "fullmetal-alchemist-brotherhood-1?",
                            "tmdb_id": 25425,
                            "year": 2009,
                            "episodes": "1-64",
                            "episode_offset": 0
                        },
                        {
                            "name": "hunter-x-hunter-2?",
                            "tmdb_id": 46298,
                            "year": 2011,
                            "episodes": "65-212",
                            "episode_offset": 64
                        },
                        {
                            "name": "steinsgate-3?",
                            "tmdb_id": 42509,
                            "year": 2011,
                            "episodes": "213-236",
                            "episode_offset": 212
                        }
                    ];
                });
        }
        
        document.addEventListener('DOMContentLoaded', function() {
            // Load anime data from external URL
            loadAnimeData();
            
            // Get DOM elements
            const searchInput = document.getElementById('search-input');
            const searchButton = document.getElementById('search-button');
            const searchResults = document.getElementById('search-results');
            const episodeNav = document.getElementById('episode-nav');
            const seasonSelector = document.getElementById('season-selector');
            const episodeGrid = document.getElementById('episode-grid');
            const serverDropdown = document.getElementById('server-dropdown');
            const serverList = document.getElementById('server-list');
            const selectedServer = document.getElementById('selected-server');
            let videoPlayer = document.getElementById('video-player');
            const currentServerName = document.getElementById('current-server-name');
            const movieTitle = document.getElementById('movie-title');
            
            // Populate server dropdown
            englishServers.forEach((server, index) => {
                const serverOption = document.createElement('div');
                serverOption.className = `server-option ${index === 0 ? 'active' : ''}`;
                serverOption.textContent = server.name;
                serverOption.dataset.serverIndex = index;
                
                serverOption.addEventListener('click', function() {
                    // Update active server
                    document.querySelectorAll('.server-option').forEach(option => {
                        option.classList.remove('active');
                    });
                    this.classList.add('active');
                    
                    const serverIndex = parseInt(this.dataset.serverIndex);
                    currentServer = englishServers[serverIndex];
                    
                    // Update selected server display
                    selectedServer.textContent = currentServer.name;
                    currentServerName.textContent = currentServer.name;
                    
                    // Hide dropdown
                    serverList.classList.add('hidden');
                    
                    // Update player if content is selected
                    updatePlayer();
                });
                
                serverList.appendChild(serverOption);
            });
            
            // Set default server
            selectedServer.textContent = englishServers[0].name;
            currentServerName.textContent = englishServers[0].name;
            
            // Toggle server dropdown
            serverDropdown.addEventListener('click', function(e) {
                e.stopPropagation();
                serverList.classList.toggle('hidden');
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function() {
                serverList.classList.add('hidden');
            });
            
            // Add click event to search button
            searchButton.addEventListener('click', performSearch);
            
            // Add enter key event to search input
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    performSearch();
                }
            });
            
            // Add change event to season selector
            seasonSelector.addEventListener('change', function() {
                currentSeason = parseInt(this.value);
                loadEpisodesForCurrentSeason();
            });
            
            // Function to perform search
            function performSearch() {
                const query = searchInput.value.trim();
                if (!query) return;
                
                // Show loading state
                searchResults.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Searching...</div>';
                searchResults.classList.remove('hidden');
                
                // Search TMDB
                fetch(`${TMDB_BASE_URL}/search/tv?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`)
                    .then(response => response.json())
                    .then(data => {
                        displaySearchResults(data.results);
                    })
                    .catch(error => {
                        console.error('Error searching TMDB:', error);
                        searchResults.innerHTML = '<div class="error-message">Error searching. Please try again.</div>';
                    });
            }
            
            // Function to display search results
            function displaySearchResults(results) {
                searchResults.innerHTML = '';
                
                if (results.length === 0) {
                    searchResults.innerHTML = '<div style="text-align: center; padding: 20px; width: 100%;">No results found.</div>';
                    return;
                }
                
                results.forEach(result => {
                    const resultElement = document.createElement('div');
                    resultElement.className = 'search-result';
                    
                    // Determine title and year
                    const title = result.name;
                    const year = result.first_air_date ? new Date(result.first_air_date).getFullYear() : 'N/A';
                    
                    // Check if it's in our anime database
                    const animeInDatabase = animeDatabase.find(anime => anime.tmdb_id === result.id);
                    
                    // Use actual poster if available, otherwise use placeholder
                    const posterUrl = result.poster_path ? 
                        `${TMDB_IMAGE_BASE_URL}${result.poster_path}` : 
                        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDIwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMWExYTJlIi8+CjxwYXRoIGQ9Ik04MCAxMjBIMTIwVjE4MEg4MFYxMjBaIiBmaWxsPSIjNGU1NGM4Ii8+CjxwYXRoIGQ9Ik02MCA2MEgxNDBWODBINjBWNjBaIiBmaWxsPSIjNGU1NGM4Ii8+CjxwYXRoIGQ9Ik00MCAyMjBIMTYwVjI0MEg0MFYyMjBaIiBmaWxsPSIjNGU1NGM4Ii8+Cjwvc3ZnPgo=';
                    
                    resultElement.innerHTML = `
                        <img src="${posterUrl}" alt="${title}" class="result-poster">
                        <div class="result-info">
                            <div class="result-title">${title}</div>
                            <div class="result-year">${year} • TV Show</div>
                            ${animeInDatabase ? '<div class="result-type">Anime</div>' : ''}
                        </div>
                    `;
                    
                    resultElement.addEventListener('click', () => {
                        selectContent(result);
                    });
                    
                    searchResults.appendChild(resultElement);
                });
            }
            
            // Function to handle content selection
            function selectContent(content) {
                console.log('Selected content:', content);
                
                currentContent = content;
                
                // Update movie title
                const title = content.name;
                const year = content.first_air_date ? new Date(content.first_air_date).getFullYear() : '';
                movieTitle.textContent = `${title} (${year})`;
                
                // Hide search results
                searchResults.classList.add('hidden');
                
                // Show episode navigation
                console.log('Anime selected, fetching seasons...');
                fetchAllSeasons(content.id);
                
                // Reset video player
                if (videoPlayer.tagName === 'IFRAME') {
                    videoPlayer.src = '';
                    const placeholder = document.createElement('div');
                    placeholder.className = 'video-player';
                    placeholder.innerHTML = `
                        <div style="display: flex; justify-content: center; align-items: center; height: 100%; background: #000;">
                            <div style="text-align: center;">
                                <i class="fas fa-film" style="font-size: 64px; color: #4e54c8; margin-bottom: 20px;"></i>
                                <p>Select an episode to start streaming</p>
                            </div>
                        </div>
                    `;
                    videoPlayer.parentNode.replaceChild(placeholder, videoPlayer);
                    videoPlayer = placeholder;
                }
            }
            
            // Function to fetch all seasons from TMDB API
            function fetchAllSeasons(contentId) {
                console.log('Fetching seasons for content ID:', contentId);
                episodeNav.classList.remove('hidden');
                episodeGrid.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Loading seasons...</div>';
                
                // Fetch TV show details to get all seasons
                fetch(`${TMDB_BASE_URL}/tv/${contentId}?api_key=${TMDB_API_KEY}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(tvDetails => {
                        console.log('TV details received:', tvDetails);
                        allSeasons = tvDetails.seasons.filter(season => season.season_number > 0);
                        
                        if (allSeasons.length === 0) {
                            episodeGrid.innerHTML = '<div class="error-message">No seasons available for this show.</div>';
                            return;
                        }
                        
                        // Populate season selector
                        seasonSelector.innerHTML = '';
                        allSeasons.forEach(season => {
                            const option = document.createElement('option');
                            option.value = season.season_number;
                            option.textContent = `Season ${season.season_number} (${season.episode_count} episodes)`;
                            seasonSelector.appendChild(option);
                        });
                        
                        // Load episodes for first season
                        currentSeason = allSeasons[0].season_number;
                        loadEpisodesForCurrentSeason();
                    })
                    .catch(error => {
                        console.error('Error fetching TV details:', error);
                        episodeGrid.innerHTML = '<div class="error-message">Error loading seasons. Please try again.</div>';
                    });
            }
            
            // Function to load episodes for current season
            function loadEpisodesForCurrentSeason() {
                console.log('Loading episodes for season:', currentSeason);
                episodeGrid.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Loading episodes...</div>';
                
                // Fetch season details
                fetch(`${TMDB_BASE_URL}/tv/${currentContent.id}/season/${currentSeason}?api_key=${TMDB_API_KEY}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(seasonDetails => {
                        console.log('Season details received:', seasonDetails);
                        episodeGrid.innerHTML = '';
                        
                        if (!seasonDetails.episodes || seasonDetails.episodes.length === 0) {
                            episodeGrid.innerHTML = '<div class="error-message">No episodes available for this season.</div>';
                            return;
                        }
                        
                        // Create episode buttons
                        seasonDetails.episodes.forEach(episode => {
                            const episodeButton = document.createElement('button');
                            episodeButton.className = 'episode-button';
                            episodeButton.textContent = episode.episode_number;
                            episodeButton.title = `${episode.name || `Episode ${episode.episode_number}`}`;
                            
                            episodeButton.addEventListener('click', function() {
                                // Update active episode
                                document.querySelectorAll('.episode-button').forEach(btn => {
                                    btn.classList.remove('active');
                                });
                                this.classList.add('active');
                                
                                currentEpisode = episode.episode_number;
                                
                                // Update player
                                updatePlayer();
                            });
                            
                            episodeGrid.appendChild(episodeButton);
                        });
                        
                        // Activate first episode
                        if (seasonDetails.episodes.length > 0) {
                            episodeGrid.children[0].classList.add('active');
                            currentEpisode = seasonDetails.episodes[0].episode_number;
                            
                            // Update player
                            updatePlayer();
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching season details:', error);
                        episodeGrid.innerHTML = '<div class="error-message">Error loading episodes. Please try again.</div>';
                    });
            }
            
            // Function to update the player
            function updatePlayer() {
                if (!currentContent) return;
                
                // Check if the current content is in our anime database
                const animeInDatabase = animeDatabase.find(anime => anime.tmdb_id === currentContent.id);
                
                let animeName;
                let megaplayEpisode = currentEpisode;
                
                if (animeInDatabase) {
                    animeName = animeInDatabase.name;
                    // Calculate the correct episode number for MegaPlay
                    megaplayEpisode = currentEpisode + animeInDatabase.episode_offset;
                } else {
                    // If not in database, create a simple name from the title
                    animeName = currentContent.name.toLowerCase().replace(/\s+/g, '-') + '-1?';
                }
                
                // Generate the URL based on server type
                const url = `https://gogoanime.me.uk/newplayer.php?id=${animeName}?ep=${megaplayEpisode}&type=hd-1&category=${currentServer.category}`;
                
                // Update video player source
                if (videoPlayer.tagName === 'IFRAME') {
                    videoPlayer.src = url;
                } else {
                    // Replace the placeholder with an iframe
                    const iframe = document.createElement('iframe');
                    iframe.className = 'video-player';
                    iframe.src = url;
                    iframe.allowFullscreen = true;
                    videoPlayer.parentNode.replaceChild(iframe, videoPlayer);
                    // Update reference
                    videoPlayer = iframe;
                }
                
                // Update the current server display with episode info
                if (animeInDatabase && animeInDatabase.episode_offset > 0) {
                    currentServerName.textContent = `${currentServer.name} (Episode ${megaplayEpisode})`;
                } else {
                    currentServerName.textContent = currentServer.name;
                }
            }
        });
    </script>
</body>
</html>
