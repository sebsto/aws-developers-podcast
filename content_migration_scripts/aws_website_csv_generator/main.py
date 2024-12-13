import xml.etree.ElementTree as ET
import csv

def extract_data(root):
    data = []
    for item in root.findall('./channel/item'):
        entry = {}
        for field in ['title', 'description', 'link', 'pubDate', 'guid', 'enclosure', 'guest']:
            element = item.find(field)
            if element is not None:
                if field == 'enclosure':
                    entry[field] = element.get('url')
                else:
                    entry[field] = element.text
        
        data.append(entry)
    return data

def write_csv(data, filename):
    with open(filename, 'w', newline='') as csvfile:
        fieldnames = ['item_id', 'item_name', 'item_tags', 'version', 'contentType', 'DatePublished', 'dateString', 'enableShare', 'EpisodeNum', 'globalContentType', 'imageSrcUrl', 'landingPageURL', 'MediaURL', 'seriesTitle', 'Speakers', 'subscribeURL', 'Summary', 'Title']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

        writer.writeheader()
        for entry in data:
            writer.writerow(entry)

def map_data(data):
    '''
    Map the input dictionary
    from
    "'title', 'description', 'link', 'pubDate', 'guid'"
    to
    "'item_id', 'item_name', 'item_tags', 'version', 'contentType', 'DatePublished', 'dateString', 'enableShare', 'EpisodeNum', 'globalContentType', 'imageSrcUrl', 'landingPageURL', 'MediaURL', 'seriesTitle', 'Speakers', 'subscribeURL', 'Summary', 'Title'"
    '''
    mapped_data = []
    for entry in data:
        guid = entry.get('guid', '')
        pubDate = entry.get('pubDate', '')
        title = entry.get('title', '')
        mapped_entry = {
            'item_id': guid,
            'item_name': title,
            'item_tags': 'GLOBAL#content-type#podcast,GLOBAL#flag#new,GLOBAL#language#english,GLOBAL#location#americas,GLOBAL#methodology#devops,GLOBAL#role#developer,GLOBAL#tech-category#devtools,aws-developer-podcast#flag#new',
            'version': '1',
            'contentType': 'Podcast',
            'DatePublished': pubDate,
            'dateString': convert_date(pubDate),
            'enableShare': '1',
            'EpisodeNum': guid.split('.')[0],
            'globalContentType': '',
            'imageSrcUrl': '',
            'landingPageURL': entry.get('link', ''),
            'MediaURL': entry.get('enclosure',''),
            'seriesTitle': '',
            'Speakers': entry.get('guest', ''),
            'subscribeURL': '',
            'Summary': entry.get('description', ''),
            'Title': title
        }
        mapped_data.append(mapped_entry)
    return mapped_data

def convert_date(date_str: str):
    from datetime import datetime

    # Input date string
    # "Thu, 18 Jul 2024 23:00:00 -0500"

    # Parse the input date string
    date_obj = datetime.strptime(date_str, "%a, %d %b %Y %H:%M:%S %z")

    # Convert to the desired format
    desired_format = "%m/%d/%Y"
    formatted_date = date_obj.strftime(desired_format)

    return formatted_date

def main():
    try:
        # read content from url
        from urllib.request import urlopen
        url = "https://developers.podcast.go-aws.com/web/podcasts/feed.xml"
        with urlopen(url) as f:
            tree = ET.parse(f)
            root = tree.getroot() 
            data = extract_data(root)
            data = map_data(data)
            write_csv(data, 'output.csv')
            print("CSV file generated successfully.")
    except FileNotFoundError:
        print("Error: feed.xml not found in the current directory.")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()



