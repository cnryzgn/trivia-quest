import { Link } from "react-router-dom"

import { DataContext, useContext } from "../Context/DataContext"
import { useEffect, useState } from "react"

import { FormControl, InputLabel, Select, MenuItem } from "@mui/material"
import { useNavigate } from "react-router-dom"

import axios from "axios"


export const Home = () => {
    const navigate = useNavigate()
    const { categories, difficulties, selectedCategory, setSelectedCategory, setSelectedDifficulty, selectedDifficulty, setQuestions }: any = useContext(DataContext)
    const [sortedCategories, setSortedCategories] = useState([])
    const [showOptions, setShowOptions] = useState<boolean>(false)


    useEffect(() => {
        if (categories.length > 0) {
            const sortedCategoryArray = categories.sort((a: any, b: any) => a.name.localeCompare(b.name))
            setSortedCategories(sortedCategoryArray)
        }
    }, [categories])

    const firstLetterUpperCase = (str: string) => str[0].toLocaleUpperCase() + str.slice(1)

    function fetchQuestions() {
        if (selectedCategory !== undefined && (selectedDifficulty !== '' && selectedDifficulty !== undefined)) {
            axios.get(`https://opentdb.com/api.php?amount=10&category=${selectedCategory}&difficulty=${selectedDifficulty}&type=multiple`)
                .then((res: any) => res.data)
                .then((data: any) => {
                    setQuestions(data.results)
                    navigate('/questions')
                })
                .catch((err: any) => err)
        }
    }

    return (
        <div className="home__container">
            <div className="home__wrapper">
                <h1>Trivia Quiz</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum possimus officiis voluptates aliquam sint nobis. Vitae ducimus dignissimos et, impedit culpa sunt tenetur fuga fugiat facilis possimus explicabo autem commodi?</p>
                {
                    showOptions === false &&
                    <button onClick={() => setShowOptions(true)} className="visible-options__button">Show options</button>
                }

                {
                    showOptions === true && (sortedCategories.length > 0 && difficulties.length > 0) &&
                    <div className="options__wrapper">
                        {
                            sortedCategories.length > 0 &&
                            <FormControl fullWidth>
                                <InputLabel id="category-label">Select a category</InputLabel>
                                <Select
                                    labelId="category-label"
                                    id="category-selection"
                                    defaultValue={''}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    {
                                        sortedCategories.map((category: any, index: number) => (
                                            <MenuItem key={index} value={category.id}>{firstLetterUpperCase(category.name)}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        }

                        {
                            difficulties.length > 0 &&
                            <FormControl fullWidth>
                                <InputLabel id="difficulty-label">Select a difficulty</InputLabel>
                                <Select
                                    labelId="difficulty-label"
                                    id="difficulty-selection"
                                    defaultValue={''}
                                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                                >
                                    {
                                        difficulties.map((difficulty: any, index: number) => (
                                            <MenuItem key={index} value={difficulty}>{firstLetterUpperCase(difficulty)}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        }
                        <button type="button" onClick={fetchQuestions} className="start__button">Start</button>
                    </div>
                }
            </div>
        </div>
    )
}