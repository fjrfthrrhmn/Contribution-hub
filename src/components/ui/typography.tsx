import React, { forwardRef, JSX } from "react"

import { cva, VariantProps } from "class-variance-authority"

import { cn } from "@/utils"

type TitleStyleProps = VariantProps<typeof TitleStyles>

interface TitleProps
	extends
		React.HTMLAttributes<HTMLHeadingElement>,
		Omit<TitleStyleProps, "level" | "weight"> {
	variant: `${NonNullable<TitleStyleProps["level"]>}/${NonNullable<TitleStyleProps["weight"]>}`
}

const Title = forwardRef<HTMLHeadingElement, TitleProps>((props, ref) => {
	const { children, variant, className, ...rest } = props

	const [level, weight] = variant.split("/") as [
		TitleStyleProps["level"],
		TitleStyleProps["weight"]
	]

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const Comp = `h${level}` as any

	return (
		<Comp
			ref={ref}
			className={cn(TitleStyles({ level, weight }), className)}
			{...rest}
		>
			{children}
		</Comp>
	)
})

type TextStyleProps = VariantProps<typeof TextStyles>

interface TextProps
	extends
		React.HTMLAttributes<HTMLParagraphElement>,
		Omit<TextStyleProps, "size" | "weight"> {
	variant?: `${NonNullable<TextStyleProps["size"]>}/${NonNullable<TextStyleProps["weight"]>}`
	as?: keyof Pick<
		JSX.IntrinsicElements,
		"p" | "code" | "strong" | "span" | "small" | "mark" | "kbd"
	>
}

const Text = forwardRef<HTMLParagraphElement, TextProps>((props, ref) => {
	const {
		as: Tag = "p",
		children,
		className,
		variant = "md/normal",
		...rest
	} = props

	const [size, weight] = variant?.split("/") as [
		TextStyleProps["size"],
		TextStyleProps["weight"]
	]

	return (
		<Tag
			ref={ref}
			className={cn(TextStyles({ size, weight, className }))}
			{...rest}
		>
			{children}
		</Tag>
	)
})

const TitleStyles = cva(["leading-none text-pretty"], {
	variants: {
		level: {
			1: "text-4xl md:text-5xl",
			2: "text-3xl md:text-4xl",
			3: "text-2xl md:text-3xl",
			4: "text-xl md:text-2xl",
			5: "text-lg md:text-xl",
			6: "text-base md:text-lg"
		},
		weight: {
			normal: "font-normal",
			medium: "font-medium",
			semibold: "font-semibold",
			bold: "font-bold",
			extrabold: "font-extrabold",
			black: "font-black"
		}
	}
})

const TextStyles = cva(["text-paragraph leading-normal text-pretty"], {
	variants: {
		size: {
			xl: "text-2xl",
			lg: "text-xl",
			md: "text-lg",
			sm: "text-base",
			xs: "text-sm"
		},
		weight: {
			normal: "font-normal",
			medium: "font-medium",
			semibold: "font-semibold",
			bold: "font-bold",
			black: "font-black"
		}
	}
})

Title.displayName = "Title"
Text.displayName = "Text"

const Typography = { Title, Text }
export default Typography
