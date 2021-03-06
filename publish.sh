changed=$(lerna changed)
if [ -n "$changed" ]
then 
  echo -e "\e[33m\nUpdating packages:"
  for package in $changed
  do
    echo $package
    scoped="$scoped --scope $package"
  done
  echo -e "\e[39m"
  {
  lerna version &&
  lerna run $scoped build-production &&
  lerna run $scoped publish &&
  echo -e "\e[92mPublish completed\e[39m\n"
  } || {
    echo -e "\n\e[31mError happend :( \e[39m\n"
  }
  scoped=""
else 
  echo -e "\n\e[92mNo packages to update \e[39m\n"
fi

read -n 1 -s -r -p "\n\nPress any key to exit"