# this script won't work outside the context of its rails app
# require 'httparty'
# require 'open-uri'
# require 'nokogiri'
# require 'byebug'
# require 'mechanize'
# require 'awesome_print'

class Scraper
    url = 'http://search.adamscountysheriff.org/inmatesearch.php'
    agent = Mechanize.new do |agent|
      agent.log = Logger.new("agent.log")
      agent.keep_alive = true
      agent.read_timeout = 5
      agent.open_timeout = 5
    end

    page = agent.get(url)
    form = page.form()

    form.lastname = 'b'
    page = agent.submit(form)

    inmates = page.search('table.backgroundGradient').map do |inmate|
      inmate.search('tr td').map do |info|
        keys, vals = info.children.partition {|c| c.element? }
        keys.map! {|k| k.text.strip.squish }
        vals.map! {|k| k.text.strip.squish }
        keys.zip(vals).to_h
      end
    end
    ap "#{inmates.size} inmates found"
    ap inmates
end
