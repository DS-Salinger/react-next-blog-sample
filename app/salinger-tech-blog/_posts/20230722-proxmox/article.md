---
title: 'Proxmox VE 8.0 によるホームラボ構築'
date: '2023-07-22 21:00:00'
author:
  name: さりんじゃー
  picture: '/assets/author.png'
coverImage:
  url: '@@image@@/proxmox.png'
  width: 150
  height: 150
ogImage:
  url: '@@image@@/proxmox.png'
tags:
  - 'Other'
  - 'Proxmox'
  - 'Virtualization'
  - 'Home server'
---

# はじめに

## なぜホームラボをつくるのか？

　自宅で新技術の検証を行おうとしたときに、1番問題になるのは検証用環境の準備です。例えば、新 OS がリリースされた際に自分のメイン環境をいきなり切り替える前に、何か問題がでないかどうか別環境で検証してからアップデートするほうが安全ですし、長時間処理が続くような処理を実行しようとした場合に通常利用するマシンのバックグラウンドで実行するすると不都合がある場合もあります。またミドルウェアを検証する際に要求される環境に開発環境のソフトウェアやライブラリのバージョンが異なる場合にどうにか合わせる作業は非常に面倒かつ不可逆的なトラブルを引き起こすことがあります。

　このような場合に近年ではクラウド環境を用いて検証することも多いと思いますが、従量課金の環境だと高スペックが要求されるものは気軽に試しづらかったりすると思います。そこで今回は自宅に高スペックのを環境を構築し気軽に検証したり、長期間の運用を行う必要がある場合でも対応できるように Proxmox VE を利用したホームラボ(仮想マシン・仮想ストレージ・仮想ネットワーク環境)を構築しました。

　一度2023年1月ごろに環境を構築ていましたが、2023年7月に GPU とメモリを新規に追加した際、新規に環境を構築しなおしたのでその際の記録を備忘録として記載しています。

## Proxmox VE (PVE) とは？

![proxmox screenshot](@@image@@/proxmox-screenshot.png)

　[Proxmox VE (Virtual Environment)](https://www.proxmox.com/en/) は KVM ベースの仮想マシン、仮想ネットワーク、仮想ストレージ関係の機能を備えたオープンソースの仮想環境マネジメントツールで、Web インターフェースから操作可能なベアメタル型のハイパーバイザです。PVE のベースとなっている OS は Debian Linux のため通常の Linux サーバの延長線で管理可能です。

　仕組みとしては VMWare ESXi や Hyper-V Server などが同カテゴリの製品になります。すべて個人で利用する場合は無償で利用できるライセンスがありますが、VMWare ESXi は専用のドライバが必要なためハードウェア要件が厳しく、有志が検証しているもののなかから選んで組むのであれば大きな問題になりづらいですが、個人が気軽に組むには少しハードルが高いです。Hyper-V Serverに関しては無償の Hyper-V Server 2019 がありましたが、どうやら 2022 はリリースされず（2019の2029年までの継続サポートはあります）、Azure Stack HCI などをを使う方針となったようで個人で利用できる無償の環境としては将来的な継続利用が難しそうです。

　PVE は個人でもフル機能が利用でき、有償版との違いは専用リポジトリを含めたサポートの有無なので現在個人開発用途で環境を構築するには一番良いものだと思います。日本語のドキュメントは少ないので、クラスタなどを組みつつすべての機能を使い倒そうとすると多少ハードルはありますが、一般的な AWS、Azure、GCP などのクラウド環境を触ったことがある人であれば、最低限の仮想マシン、ストレージ、ネットワークの活用を行う上ではそこまで問題にならないと思います。

## マシン構成

| 項目       | 内容                                            | 価格目安 |
|------------|-------------------------------------------------|----------|
| ベアボーン | ASRock DeskMeet X300                            | 28,000円 |
| CPU        | AMD Ryzen 7 5700G BOX                           | 25,000円 |
| Memory     | Crucial CT2K32G4DFD832A 32GB x 2 -> 4 = 128GB   | 36,000円 |
| Storage    | KIOXIA EXCERIA PLUS G2 2TB                      | 15,000円 |
| GPU        | CPU内蔵 -> MSI GeForce RTX 3060 AERO ITX 12G OC | 46,000円 |
| LAN        | On-board                                        | -        |

　主にコスパを考えて、比較的時間が経過してこなれた価格になっていて、かつ小型の X300 系チップセット搭載のベアボーン ASRock DeskMeet X300 を選択しました。買った当時 PCIe にはGPU、M.2 SSD 追加、10GbEなどを将来刺してなんらか拡張しょうかなと考えていましたが、長時間かかる機械学習系の処理を実行・検証するために 3060 を追加しました。

　CPU は複数の仮想マシンを同時に運用する前提で最低でも8コア16スレッドのものを考えていたのですが Ryzen 7 5700G がスペックと価格のバランスがよかったためこちらを選択しました。

　GPUは購入する際に4060や4060Tiの発売のタイミングだったため GPU は悩みましたが、生成系AIの実験のためメモリは最低12GBは確保したかったのと、4060Ti 16GB は本機の場合 PCIe 3.0 x 8 動作になってしまうので性能面のロスもあり、かつ約2倍の金額になっていたため200mm以下のものが出るのを待たなくてもよいかなと判断して 3060 12GB のショートサイズのものを選びました。今後ハイパワーなものが必要になった場合は 4080、4090 もしくは A5000 あたりで別マシン組む方向で検討することにしました。

　2023年7月時点では上記構成で15万程度で、電気代込みで考えると3年間運用した場合 7,000 ～ 8,000円 / 月程度になるかなと思います。AWS の場合 GPU なしで vCPU 8、メモリが 32GB のt3a.2xlarge が 0.3917 USD/h でディスクなども追加すると24時間起動させっぱなしにしていた場合 4万円 / 月程度になるので、適当に運用する場合は上記のような構成で自宅に構築してしまったほうがだいぶお得だと思います。

# マシンの組み立て

　普通の自作 PC と変わらないので詳細は割愛しますが、詳しくない方は一度「X300 組み立て」とかでググると下記の参考リンクのようなページが出てくるので、見ながら組み立てるとよいかと思います。パーツ数的には簡単なプラモデルぐらいの難易度ですが、はじめての人はメモリをスロットに差し込むときと CPU と CPUクーラー 関連の設置が多少ドキドキするかもしれないです。

参考： [【ASRock DeskMeet X300】グラボ搭載可能な小型ベアボーンPCの組立手順を画像付で徹底解説！](https://kuniriki-lau.com/entry/asrock-deskmeet-x300-amd-diy-pc-howto)

# Proxmox のインストール

## 初回起動まで

　今回は PCI Passthrough を活用して、仮想マシンが直接 PCI デバイス(今回は GPU の Geforce 3060)を利用できるような形で設定を行います。この形であればほぼネイティブでの処理と変わらない実行速度を得ることができます。なお vGPU という1枚の GPU を仮想的に複数に分割して取り扱うような技術も世の中には存在ますが、今回は1つの仮想マシンにのみ1物理 GPU を割り当てることのみを考えます。

　まずインストーラを書き込むための USB メモリを用意しておく必要があります。次に [公式 ISO Installer](https://www.proxmox.com/en/downloads/item/proxmox-ve-8-0-iso-installer) から ISO 形式のメディアをダウンロードします。そして [balenaEtcher](https://etcher.balena.io/) から「Windows X86|X64 PORTABLE」をダウンロードし ISO を適当なUSBメモリに書き込みます。その後組み立てたマシンに接続し、UEFI を起動して必要な設定を行います。

1. 仮想化のオプションで IOMMU を Enable に変更 
2. 起動デバイスの順位を変更し USB メモリを最優先に変更

　上記の設定を保存して USB メモリからインストーラを起動します。シンプルなインストーラなのでインストール時に特に引っかかるようなところは特にないと思いますが、不明なところがある方は参考URLを参照してください。インストールが完了したら、アクセス先の URL が画面に表示されるので別PCの Web ブラウザから開いてログインしてください。

　ちなみにデフォルトではパスワードの SSH ログインも許可されているので

```bash
$ ssh root@XXX.XXX.XXX.XXX
```

のように `@` 以下に IP を指定することで別マシンから CLI でもログイン可能です。コマンドラインで操作する場合は Web ブラウザからコンソールを操作することもできるのでお好みで選んでください。

参考：[【仮想環境】Proxmox VEをインストールして、仮想化プラットフォームを構築する方法を詳しく解説します！！](https://dareblo.com/proxmoxve-install/)

## 無償版リポジトリの設定

　Proxmox はインストール直後は有償のエンタープライズ版用のリポジトリを見るような設定になっています。コニュニティ版を利用するためにリポジトリを切り替えます。ここからは Proxmox 環境のターミナルで作業します。まずは `/etc/apt/sources.list` に以下を追記します。

```:/etc/apt/sources.list
# PVE pve-no-subscription repository provided by proxmox.com, NOT recommended for production use
deb http://download.proxmox.com/debian stretch pve-no-subscription
```

そして `/etc/apt/sources.list.d/pve-enterprise.list` 次の行をコメントアウトします。

```:/etc/apt/sources.list.d/pve-enterprise.list
# deb https://enterprise.proxmox.com/debian stretch pve-enterprise
```

ブラウザから管理画面にアクセスし、次の操作を行います。

1. [データセンター] -> [ホスト] を選択
2. [アップデート] をクリック
3. [再表示] をクリック
4. 「有効なサブスクリプションがありません」でOKボタンをクリックし「Task OK」が表示されたら [ｘ] をクリックし閉じる。
5. [>_アップグレード] をクリック
6 `Do you want to continue? [Y/n]` で Y を入力

これでリポジトリが切り替わります。

## SSH の設定

　SSH では公開鍵認証のみ許可し、パスワードによるログインを禁止するように設定します。PVE のコンソールから `/etc/ssh/sshd_confg` を開いて下記の `PubkeyAuthentication` 部分を検索し、yes に変更し保存します（デフォルトで yes だったかも？）。

```:/etc/ssh/sshd_config
PubkeyAuthentication yes
```

下記コマンドで ssh サービスを再起動します。

```bash
# /etc/init.d/ssh restart
```

ローカルのマシンで利用している SSH の公開鍵を下記コマンドでサーバに登録します。IP 部分は各自のサーバの IP を記載します。PVE root ユーザのログインパスワードを聞かれるので入力することで登録完了です。

```bash
$ ssh-copy-id root@192.168.XXX.XXX
/usr/bin/ssh-copy-id: INFO: Source of key(s) to be installed: "/home/XXX/.ssh/id_rsa.pub"
/usr/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed
/usr/bin/ssh-copy-id: INFO: 1 key(s) remain to be installed -- if you are prompted now it is to install the new keys
root@192.168.XXX.XXX's password:
```

下記コマンドを実行して、パスワードなしでログインできることを確認します。

```bash
$ ssh root@192.168.XXX.XXX -i ~/.ssh/id_rsa
```

最後にパスワードによるログインを禁止します。

PVE のコンソールから `/etc/ssh/sshd_confg` を開いて下記の `PasswordAuthentication` 部分を検索し、no に変更し保存します。

```:/etc/ssh/sshd_config
PasswordAuthentication no
```

下記コマンドで ssh サービスを再起動します。

```bash
# /etc/init.d/ssh restart
```

## PCI Passthrough 関連の設定

　まずは IOMMU が正しく有効化できているか確認します。次のコマンドをProxmox側のターミナルで入力して、IOMMU が有効になっているかどうかを確認します。

```bash
# dmesg | grep -e DMAR -e IOMMU
[    0.512107] pci 0000:00:00.2: AMD-Vi: IOMMU performance counters supported
[    0.512590] pci 0000:00:00.2: AMD-Vi: Found IOMMU cap 0x40
[    0.833200] perf/amd_iommu: Detected AMD IOMMU #0 (2 banks, 4 counters/bank).

# dmesg | grep 'remapping'
[    0.512595] AMD-Vi: Interrupt remapping enabled
```

筆者の環境の場合は有効になっている場合に上記のような出力になりました。

　次に Proxmox 起動時に利用している GRUB の設定を変更します。`/etc/default/grub` を開き `GRUB_CMDLINE_LINUX_DEFAULT` を下記のように書き換えます。筆者は AMD の CPU を利用しているため下記のように記載しましたが Intel 系の場合は `amd_iommu=on` の部分を `intel_iommu=on` とします。

```:/etc/default/grub
# Before
GRUB_CMDLINE_LINUX_DEFAULT="quiet"
```

```:/etc/default/grub
# After(AMDの場合)
GRUB_CMDLINE_LINUX_DEFAULT="quiet amd_iommu=on iommu=pt"
```

そして次のコマンドを実行して GRUB の設定を更新します。

```
# update-grub
```

`/etc/modules` につぎの内容を記載します。


```:/etc/modules
vfio
vfio_iommu_type1
vfio_pci
vfio_virqfd
```

NVIDIA 製 GPU の場合、`/etc/modprobe.d/blacklist.conf` に次のコマンドで設定を追記します。

```bash
$ echo "blacklist nouveau" >> /etc/modprobe.d/blacklist.conf 
$ echo "blacklist nvidia*" >> /etc/modprobe.d/blacklist.conf
```

ここまでで設定は終わりです。変更を反映するためにサーバを再起動します。

```
# reboot
```

# おわりに

　これで PVE により GPU を搭載した自由に使える検証環境が構築できました。次は仮想マシンで GPU を利用可能な形でデータ分析用の開発環境を構築していく予定なので気になる方はそちらも読んでみてください。

　ただの検証用にしか使わないのであれば、壊れたらすぐ作り直せばよいですが、定常運用が必要なものを環境内で動かし続ける場合は別途データのバックアップやリストアの自動化、監視機能の設定、複数台構成による冗長化などを検討する必要があるかと思います。困ったときは英語になりますが[公式ドキュメント](https://pve.proxmox.com/pve-docs/chapter-sysadmin.html)をみると大体のことは書いてあります。


# 参考資料

参考：[GPUパススルーも簡単にできる仮想化プラットフォーム「Proxmox VE」](https://internet.watch.impress.co.jp/docs/column/shimizu/1442466.html)
参考：[公式ドキュメント](https://pve.proxmox.com/pve-docs/chapter-sysadmin.html)
