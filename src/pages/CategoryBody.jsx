import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import StickyNavbar from "../components/UI/stickyNavbar/StickyNavbar";
import Menu from "../components/UI/menu/Menu";
import TestService from "../API/TestService"
import { useFetching } from '../hooks/useFetching';
import Test from "../components/Test";
import CategoryService from "../API/CategoryService";
import {userService} from "../API/UserService";
import CompletedTasksService from "../API/CompletedTasksService";
import VideoService from "../API/VideoService";

function CategoryBody() {
	const initialValue = [{id:0, categoryid:0, question:"", testBody:[{isCorrect:false, answerText:""}]}]
	const initialValueCategory = {id:0, title: "", photoUrl: "", role: "User"};
	const initialValueVideo = {id:0, link:"", title:"", categoryId:0};
	const user = userService.userValue;
    const { id } = useParams();
	const [tests, setTests] = useState(initialValue);
	const [categories, setCategories] = useState([]);
	const [completedTask, setCompletedTask] = useState(null);
	const [category, setCategory] = useState(initialValueCategory);
	const [video, setVideo] = useState(initialValueVideo);
  
  const [fetchCategories, isCategoriesLoading, categoriesError] = useFetching( async () => {
    const categories = await CategoryService.getByRole(user.role);
    setCategories(categories);
	const category = categories.find((x) => x.id === Number(id));
	setCategory(category);
  })
	
	const [fetchTests, isTestsLoading, testsError] = useFetching( async () => {
		const tests = await TestService.getByCategoryId(id);
		setTests(tests)
	  })
	
	  const [fetchCompletedTask, isCompletedTaskLoading, completedTaskError] = useFetching( async () => {
		const completedTask = await CompletedTasksService.getByIds(user.id, id);
		setCompletedTask(completedTask);
	  })

	  useEffect(() => {
		fetchTests()
		fetchCategories()
		fetchCompletedTask()
		VideoService.getByCategoryId(id).then(x => setVideo(x));
	  }, [id])

	  if(category == null) {
		return (
			<div className="content">

			</div>
		)
	  }

    return (
			<div className="content">
				<h1>
					{category.title}
				</h1>
				<div className="video">
				<iframe width="560" height="315" src={video.link} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
				</div>
				<div className="quetions-and-menu">
				{isTestsLoading
          ? <h1>Идет загрузка</h1>
		  :
				<Test tests={tests} completedTask={completedTask} user={user} categoryId={id} categories={categories}/>
				}
				<Menu categories={categories} menuCategory="Test"/>
				</div>
			</div>
    );
}

export default CategoryBody;