const HomeAbout: React.FC = () => {
  return(
    <div className="p-2">
	<h2 className="text-xl">本サイトについて</h2>
	<p className="p-2 text-sm">　本サイトは筆者が普段の業務で学んだこと、日常的に勉強したこと、各種環境構築などを記録した備忘録です。色んなジャンルに手を出してますがメイントピックはデータ分析、自然言語処理、建築 × IT です。なにかありましたら Twitter でご連絡ください。</p>

	<h2 className="text-xl">コンテンツ</h2>
	<p className="p-2 text-sm">　主に以下の内容に関しての記事をまとめています。</p>
	<ul className="list-disc ml-8 text-sm">
	  <li>データ分析に関するお話 (Data Science)</li>
	  <li>自然言語処理に関するお話 (NLP)</li>
	  <li>建築・建設×ITに関するお話(Architecture)</li>
	  <li>インフラ・環境構築やフロントエンド他 (Other)</li>
	</ul>

    </div>
  );
}

export default HomeAbout;
