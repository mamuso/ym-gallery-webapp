# encoding: utf-8
Encoding.default_external = "utf-8"

require 'rubygems'
require 'json'
require 'cgi'
require 'fileutils'
require 'pathname'

# ===============================================
# 
#   Copy output folders
# 
# ===============================================

dropbox_json = File.read(ENV['HOME']+'/.dropbox/info.json')
dropbox = JSON.parse(dropbox_json)['business']['path']
dsbuilder = dropbox+'/DesignSite'


# Zip!
unless $LOAD_PATH.include?(File.expand_path(dsbuilder+"/lib/rubyzip/lib"))
  $LOAD_PATH.unshift(File.expand_path(dsbuilder+"/lib/rubyzip/lib"))
end
require "zip"

class ZipFileGenerator
  # Initialize with the directory to zip and the location of the output archive.
  def initialize(inputDir, outputFile)
    @inputDir = inputDir
    @outputFile = outputFile
  end

  # Zip the input directory.
  def write()
    entries = Dir.entries(@inputDir); entries.delete("."); entries.delete(".."); entries.delete("yamproject.json"); entries.delete(".DS_Store")
    io = Zip::File.open(@outputFile, Zip::File::CREATE);
    writeEntries(entries, "", io)
    io.close();
  end

  # A helper method to make the recursion work.
  private
  def writeEntries(entries, path, io)
    entries.each { |e|
      zipFilePath = path == "" ? e : File.join(path, e)
      diskFilePath = File.join(@inputDir, zipFilePath)
      if  File.directory?(diskFilePath)
        io.mkdir(zipFilePath)
        subdir =Dir.entries(diskFilePath); subdir.delete("."); subdir.delete("..")
        writeEntries(subdir, zipFilePath, io)
      else
        io.get_output_stream(zipFilePath) { |f| f.puts(File.open(diskFilePath, "rb").read())}
      end
    }
  end
end


# Helper to build the json for files
def directory_hash(path, name=nil)
  data = {:folder => (name || path.split("/").last)}
  data[:children] = children = []
  Dir.foreach(path) do |entry|
    next if (entry == '..' || entry == '.' || entry == 'yamproject.json')
    full_path = File.join(path, entry)
    if File.directory?(full_path)
      children << directory_hash(full_path, entry)
    else
      children << entry
    end
  end
  return data
end

# This is really poorly done, but... 
if Dir.exist?(dsbuilder)
  # Clean it!
  FileUtils.rm_r Dir.glob(dsbuilder+'/projects/*')
  projects = Dir[dropbox+"/Yammer Product/**/yamproject.json"]

  # Pack all the projects!
  projects.each do |project|
    project_data = JSON.parse(File.read(project))

    if project_data["title"]
      slug = project_data["title"].downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
      project_path = project.split("yamproject.json")[0]
      project_dest = dsbuilder+"/projects/"+slug

      # Copying and generating the json
      FileUtils.cp_r(project_path, project_dest)
      files = directory_hash(project_dest)
      json_data = {
        'project' => {
          'id' => slug,
          'title' => project_data["title"],
          'files' => files
        }
      }
      f = File.new(project_dest+"/yamproject.json", "w")
      f.write(json_data.to_json) 
      f.close

      # Zip it
      zf = ZipFileGenerator.new(project_dest, project_dest+"/"+slug+".zip")
      zf.write()
    end
  end

  # Build projecs.yaml
  pd = []
  projects = Dir[dsbuilder+"/projects/**/yamproject.json"]
  projects.each do |project|
    project_data = JSON.parse(File.read(project))
    data = {}
    data['_id'] = project_data['project']['id']
    data['id'] = project_data['project']['id']
    data['title'] = project_data['project']['title']
    pd << data
  end

  json_data = {'projects' => pd}

  f = File.new(dsbuilder+"/projects/projects.json", "w")
  f.write(json_data.to_json) 
  f.close

end



# ===============================================
# 
#   Returning the file list to make the thumbnails
# 
# ===============================================

puts Dir[dsbuilder+"/projects/**/[^.]*.{jpg,jpeg,png,gif,JPG,JPEG,PNG,GIF}"]