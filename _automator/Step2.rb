# encoding: utf-8
Encoding.default_external = "utf-8"

require 'rubygems'
require 'json'
require 'cgi'
require 'fileutils'
require 'pathname'

# ===============================================
# 
#   Copy Folders
# 
# ===============================================

dropbox_json = File.read(ENV['HOME']+'/.dropbox/info.json')
dropbox = JSON.parse(dropbox_json)['business']['path']
dsbuilder = dropbox+'/DesignSite'

# This is really poorly done, but... 
if Dir.exist?(dsbuilder)
  FileUtils.rm_r Dir.glob('/tmp/ymgallery/assets/projects')
  FileUtils.cp_r(dsbuilder+"/projects", "/tmp/ymgallery/assets/projects")
end