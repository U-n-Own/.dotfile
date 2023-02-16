#This bash script is used to create subdirs in all directories in the current directory
#
# Author: Vincenzo Gargano 
# Date: Tue Dec  6 03:11:13 PM UTC 2022 
#Variables

current_dir=`pwd`
subdir_name=".config"
EXCLUDED_DIRS=(Screenshots zsh)

#Functions

function create_subdirs {
    for dir in `ls -d */`
    do
	cd $dir
	mkdir -p $subdir_name
	cd $current_dir
    done
}

# This function take each directory in current dir and copy the dotfiles from $HOME/.config/ that has the same name of 
function copy_dotfiles {

    for dir in .dotfiles/*/

    do

        dirname=$(basename "$dir")

        # Check if the directory is in the excluded list
        if [[ " ${EXCLUDED_DIRS[@]} " =~ " ${dirname} " ]]; then
            echo "Skipping $dirname"
            continue
        fi

        # Check if the directory exists in both .dotfiles and .config if true copy dotfiles
        if [ -d "$dir" ] && [ -d "$HOME/.config/$dirname" ]; then
            #Copy .config/$dirname/ into .dotfiles/$dirname
            echo "Copying dotfiles from .config"
            cp -r $HOME/.config/$dirname/* $dir
        fi

    done
}


copy_dotfiles
