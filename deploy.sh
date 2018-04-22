#ttribution: https://raw.githubusercontent.com/NatTuck/memory/master/deploy.sh

export PORT=5115
export MIX_ENV=prod
export GIT_PATH=/home/cryptoloan/src/cryptoloan

PWD=`pwd`
if [ $PWD != $GIT_PATH ]; then
	echo "Error: Must check out git repo to $GIT_PATH"
	echo "  Current directory is $PWD"
	exit 1
fi

if [ $USER != "cryptoloan" ]; then
	echo "Error: must run as user 'cryptoloan'"
	echo "  Current user is $USER"
	exit 2
fi

mix deps.get
(cd assets && npm install)
(cd assets && ./node_modules/brunch/bin/brunch b -p)
mix phx.digest
mix release --env=prod

mkdir -p ~/www
mkdir -p ~/old

NOW=`date +%s`
if [ -d ~/www/cryptoloan ]; then
	echo mv ~/www/cryptoloan ~/old/$NOW
	mv ~/www/cryptoloan ~/old/$NOW
fi

mkdir -p ~/www/cryptoloan
REL_TAR=~/src/cryptoloan/_build/prod/rel/cryptoloan/releases/0.0.1/cryptoloan.tar.gz
(cd ~/www/cryptoloan && tar xzvf $REL_TAR)

crontab - <<CRONTAB
@reboot bash /home/cryptoloan/src/cryptoloan/start.sh
CRONTAB

#. start.sh

