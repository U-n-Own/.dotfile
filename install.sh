#Script to run for apply dotfiles from github
#Author: @U-n-Own
#Date: 2022-11-07

#!bin/bash

git clone https://github.com/U-n-Own/.dotfiles/tree/manjaro-dotfiles-conf
cd .dotfiles

#Stow apply to all folders
stow */

