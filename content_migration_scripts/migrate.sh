#!/bin/bash

# Navigate to the podcasts directory
cd src/contents/podcasts

# Loop through each episode_xxx.md file
for file in episode_*.md; 
do
  # Extract the episode name without the extension
  episode_name="${file%.md}"
  
#   echo $episode_name

  # Create a new directory with the episode name
  mkdir -p "$episode_name"
  
  # Move the file to the new directory and rename it to index.md
  mv "$file" "$episode_name/index.md"
done