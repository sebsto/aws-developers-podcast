import os
import re

def transform_markdown_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    # Remove the ##links line
    content = re.sub(r'^##\s*Links\s*$', '', content, flags=re.MULTILINE)

    # Remove "Here are the links..." line
    content = re.sub(r'^Here are the links.*?\n', '', content, flags=re.MULTILINE)

    # Find all markdown links
    links = re.findall(r'^\s*-\s*\[(.*?)\]\((.*?)\)', content, re.MULTILINE)

    # Create the new links section
    new_links = "links:\n"
    for text, url in links:
        new_links += f"  - text: \"{text}\"\n"
        new_links += f"    link: {url}\n"

    # Replace the old links section with the new format
    # This pattern matches from the first link to the last one
    content = re.sub(r'^\s*-\s*\[.*?\]\(.*?\)(\n\s*-\s*\[.*?\]\(.*?\))*\n*',
                     new_links, content, flags=re.MULTILINE)

    # Ensure front matter ends at the end of file
    content = re.sub(r'\n---\s*$', '', content, flags=re.MULTILINE).strip()
    content += '\n---'

    # Write the transformed content back to the file
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(content)

def process_directory(directory_path):
    for root, _, files in os.walk(directory_path):
        for file in files:
            if file.endswith('.md'):
                file_path = os.path.join(root, file)
                print(f"Processing: {file_path}")
                transform_markdown_file(file_path)

# Use the script
base_path = "toucan/contents/episodes"
process_directory(base_path)
