set remotehost=philbladen.co.uk
set remotepath=/var/www/vhosts/moorules.com/httpdocs/
ssh %remotehost% "rm -r %remotepath%*"
cd dist
scp -r ./* "%remotehost%:%remotepath%"