# Step 1: connect your database in BadooDog by adding your password in
"ConnectionStrings": {
    "BadooDogAppCon": "server=127.0.0.1;uid=root;pwd=;database=test"
  },
  in ./BadooDog/appsettings.json

# Step 2: in the Folder ./DatabaseScripts contains script for mysql Database
use this script in your database

# Step 3: make cd ./BadooDog and use the command: 
dotnet run -- project BadooDog.csproj

# Step 4: at the same time with working server make cd to ./frontend-pets 
make npm install, 
than: 

npm install @mui/joy
npm install @mui/material
npm install @mui/icons
npm install react-router-dom
npm install @mui/icons-material
npm install react-bootstrap bootstrap
npm install -g sass

# Hopefully i havent forgotten anything