import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import StickyNavbar from "../components/UI/stickyNavbar/StickyNavbar";
import Menu from "../components/UI/menu/Menu";
import TestService from "../API/TestService"
import { useFetching } from '../hooks/useFetching';
import Test from "../components/Test";
import CategoryService from "../API/CategoryService";

function CategoryBody() {
	const initialValue = [{id:0, categoryid:0, question:"", testBody:[{isCorrect:false, answerText:""}]}]
    const { id } = useParams();
	const [tests, setTests] = useState(initialValue);
	const [categories, setCategories] = useState([])
  
  const [fetchCategories, isCategoriesLoading, categoriesError] = useFetching( async () => {
    const categories = await CategoryService.getAll();
    setCategories(categories)
  })
	
	const [fetchTests, isTestsLoading, testsError] = useFetching( async () => {
		const tests = await TestService.getByCategoryId(id);
		setTests(tests)
	  })
	
	  useEffect(() => {
		fetchTests()
		fetchCategories()
	  }, [id])



    return (
			<div className="content">
				<h1>
					Название темы {id}
				</h1>
				<div className="video">
				<iframe width="560" height="315" src="https://www.youtube.com/embed/ZvWH0D2_y_I?si=glanArOJHWnmp5ui" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
				</div>
				<div className="quetions-and-menu">
				{isTestsLoading
          ? <h1>Идет загрузка</h1>
		  :
				<Test tests={tests}/>
				}
				<Menu categories={categories} menuCategory="Test"/>
				</div>
			</div>
    );
}

export default CategoryBody;