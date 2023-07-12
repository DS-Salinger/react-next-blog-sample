import Image from 'next/image'

const HomeAuthor = (): React.FC => {
  return(
    <div className="grid grid-cols-3 p-2">
      <div className="col-span-1 h-42 p-2">
	<Image src="/assets/author.png"
	       width={120} height={120} alt="Author pic"/>
      </div>

      <div className="col-span-2">
   	<div className="text-2xl m-1">
          <h2>さりんじゃー</h2>
	</div>
	
	<div className="break-words m-2 text-sm">
	  <p>　大学時代はAI (NLP+情報検索) が専門。新卒でソシャゲ会社に入り、受託分析の会社でデータエンジニア、マネジメントを経験、M&A 後に新規に受託分析会社を立ち上げ現在に至る。社会人学生として通信制芸大の建築系も最近卒業。</p>

	</div>
      </div>

      
      <div className="col-span-1 h-8">
      	<h3 className="text-lg mt-0 ml-0">資格など</h3>
	<ul className="list-disc ml-4 sm:mt-0 md:mt-1
		       text-xs pb-1">
	  <li className="py-0.5">新潟の某大学情報系<br/>修士/学士(工学)</li>
	  <li className="py-0.5">通信制某大学建築系<br/>学士(芸術)</li>
	  <li className="py-0.5">応用情報処理技術者</li>
	  <li className="py-0.5">宅地建物取引士</li>
	</ul>	
      </div>
      
      <div className="col-span-2 h-8">
      	<h3 className="text-lg ml-2 mt-0">スキルセット</h3>
	<table className="table-fixed 
			  ml-2 sm:mt-0 md:mt-1 text-xs">
	  <tbody>
	    <tr>
	      <td className="w-20 py-0.5">データ分析</td>
	      <td>Python / R 両方メイン</td>
	    </tr>
	    <tr>
	      <td className="w-20 py-0.5">システム開発</td>
	      <td>主にPython, 最近は JS / TS 学習中</td>
	    </tr>
	    <tr>
	      <td className="w-20 py-0.5">インフラ</td>
	      <td>AWS, Azure, GCP, 多少オンプレ</td>
	    </tr>
	    <tr>
	      <td className="w-20 py-0.5 align-top">その他</td>
	      <td>MySQL, PostgreSQL, Athena, RedShift, BigQuery, TreasureData, etc.</td>
	    </tr>
	  </tbody>
	</table>

	<div className="grid place-items-end sm:mt-0 md:mt-1">
	  {/* <a href="#"
	      className="text-lg text-myorange
	      hover:underline">
	      More details
	      </a> */}
	</div>

      </div>
    </div>
  );
}

export default HomeAuthor;
