"""
Uber simple static site generator in Python


Jon Vlachogiannis
darksun4@gmail.com
"""
import os
import re

def read_config():
    pass


def read_posts(template_dir):
    # get all posts
    posts = [f for f in os.listdir(template_dir) if f.endswith('.that')]
    # read them
    print template_dir, posts
    return [{"name":post_filename,
             "data":eval(open(os.path.join(template_dir,post_filename), "r").read())}
            for post_filename in posts]

def generate_page(template_dir, template_html, post):
    # find all the tags inside template
    tags = re.findall(r'{{(.+?)}}', template_html)
    for tag in tags:
        replace_tag = "{{%s}}" % tag
        
        # create page based on post
        template_html = template_html.replace(replace_tag, post["data"].get(tag.strip()))

        # write file
        print post["name"]
        f = open(os.path.join(template_dir, "output", post["name"].split(".that")[0]) + ".html" , "w+")
        f.write(template_html)
        f.close()        

def create_posts(template_name):
    template_dir = os.path.join("templates/", template_name.split(".html")[0])
    # read all post data    
    posts_data = read_posts(template_dir)
    
    # create output dir
    print template_dir, "output"
    if not os.path.exists(os.path.join(template_dir, "output/")):
        os.makedirs(os.path.join(template_dir, "output/"))

    # generate all posts
    template_full_filename = os.path.join("templates/",template_name)    
    html_template = open(template_full_filename, "r").read()
    map(lambda x: generate_page(template_dir, html_template, x), posts_data)
    
def run():
    config = read_config()
    #get all template files
    templates = [f for f in os.listdir("templates/") if f.endswith('.html')]
    print templates
    map(lambda x: create_posts(x), templates)

if __name__ == '__main__':
    run()


