import os
import re

def replace_guest_entry(file_path):
    with open(file_path, 'r') as file:
        content = file.read()

    # Regular expression to match the guest entry
    guest_pattern = re.compile(r'guest: "(.*?)"')
    match = guest_pattern.search(content)

    if match:
        guest_entry = match.group(1)
        guests = guest_entry.split(' and ')

        guest1_name, guest1_link = re.findall(r'>(.*?)$', guests[0])[0], re.findall(r'href=\'(.*?)\'', guests[0])[0]
        guest2_name, guest2_link = '', ''

        if len(guests) > 1:
            guest2_name, guest2_link = re.findall(r'>(.*?)$', guests[1])[0], re.findall(r'href=\'(.*?)\'', guests[1])[0]

				# remove </a> from guest name 
        guest1_name = re.sub(r'</a>', '', guest1_name)
        guest2_name = re.sub(r'</a>', '', guest2_name)

				# remove trailing , when it exists
        guest1_name = re.sub(r',$', '', guest1_name)
        guest2_name = re.sub(r',$', '', guest2_name)

				# remove trailing . when it exists
        guest1_name = re.sub(r'.$', '', guest1_name)
        guest2_name = re.sub(r'.$', '', guest2_name)

        new_guest_entries = f'guest1: "{guest1_name}"\nguest1_link: "{guest1_link}"\nguest2: "{guest2_name}"\nguest2_link: "{guest2_link}"'

        new_content = guest_pattern.sub(new_guest_entries, content)
        # print(new_guest_entries)
        with open(file_path, 'w') as file:
            file.write(new_content)

def scan_and_replace(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file == 'index.md':
                file_path = os.path.join(root, file)
                print(f"======= Processing {file_path} =======")
                replace_guest_entry(file_path)

if __name__ == "__main__":
    scan_and_replace('src/contents/episodes')