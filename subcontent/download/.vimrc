set tabstop=4
set encoding=utf-8
colorscheme desert
set splitbelow
set splitright
"split navitions 不用鼠标就能切换分割布局
nnoremap <C-J> <C-W><C-J>
nnoremap <C-K> <C-W><C-K>
nnoremap <C-L> <C-W><C-L>
nnoremap <C-H> <C-W><C-H>
" Enbale folding 手动折叠
set foldmethod=indent
set foldlevel=99
nnoremap <space> za

set nocompatible              " required
filetype off                  " required

" set the runtime path to include Vundle and initialize
 set rtp+=~/.vim/bundle/Vundle.vim
 call vundle#begin()
"
" " alternatively, pass a path where Vundle should install plugins
" "call vundle#begin('~/some/path/here')
"
" " let Vundle manage Vundle, required
 Plugin 'gmarik/Vundle.vim'
 Plugin 'vim-scripts/indentpython.vim'
" 符合pep8 标准的自动缩进
 Plugin 'Valloric/YouCompleteMe'
"
" " Add all your plugins here (note older versions of Vundle used Bundle
" instead of Plugin)
" " All of your Plugins must be added before the following line
 call vundle#end()            " required
 filetype plugin indent on    " required

" 是vim 支持python3 的 pep8 标准
au BufNewFile, BufRead *.py
\ set tabstop=4
\ set softtabstop=4
\ set shiftwidth=4
\ set textwidth=4
\ set expandtab
\ set autoindent
\ set fileformat=unix

"设置 vim 打开html,css ,js

au BufNewFile, BufRead *.js, *.html,*.htm,*.json,*.css,*.jsx,*.xml
\ set tabstop=2
\ set softtabstop=2
\ set shiftwidth=2

au BufNewFile, BufRead *.py, *.pyw, *.c, *.cpp match BadWhitespace /\s\+$/
"使用pep8标准将多余的空白字符标识出来