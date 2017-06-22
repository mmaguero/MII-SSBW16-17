vagrant box add https://github.com/jose-lpa/packer-ubuntu_lts/releases/download/v3.1/ubuntu-16.04.box --name ubuntu16.04_docker
vagrant up
vagrant provision
#vagrant ssh -- -t pwd

